#!/usr/bin/env python3
"""
Generate LinkedIn-style aviation hiring posters (1080×1350 portrait).

Reads public/data/live-jobs.json (+ featured / fallbacks), composes dense
recruitment-ad PNGs/JPEGs under public/job-posters/{id}.jpg, and writes
public/data/job-posters.json.

Incremental: by default only missing / force-changed ids are regenerated.
Usage:
  python3 scripts/generate_hiring_posters.py
  python3 scripts/generate_hiring_posters.py --only-missing
  python3 scripts/generate_hiring_posters.py --force
  python3 scripts/generate_hiring_posters.py --job-id in-001
"""

from __future__ import annotations

import argparse
import hashlib
import io
import json
import os
import re
import sys
import urllib.request
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
LIVE_JOBS = ROOT / "public" / "data" / "live-jobs.json"
FEATURED_JSON = ROOT / "public" / "data" / "featured-jobs.json"
OUT_DIR = ROOT / "public" / "job-posters"
PHOTO_DIR = ROOT / "public" / "job-photos"
CITY_DIR = PHOTO_DIR / "cities"
CREW_DIR = PHOTO_DIR / "crew"
MAP_PATH = ROOT / "public" / "data" / "job-posters.json"

W, H = 1080, 1350
MAX_BYTES = 380_000  # aim under ~400KB

# DejaVu / Liberation — available on Debian/Ubuntu and most CI images
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
if not Path(FONT_BOLD).exists():
    FONT_REG = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
    FONT_BOLD = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

BRANDS = [
    (re.compile(r"indigo|goindigo|interglobe", re.I), "IndiGo", (239, 91, 37), (11, 31, 58)),
    (re.compile(r"spice\s*jet|spicejet", re.I), "SpiceJet", (227, 24, 55), (176, 16, 40)),
    (re.compile(r"air\s*india\s*express", re.I), "Air India Express", (200, 16, 46), (139, 10, 30)),
    (re.compile(r"air\s*india|airindia|aisats|ai\s*sats", re.I), "Air India", (218, 14, 41), (139, 0, 0)),
    (re.compile(r"akasa", re.I), "Akasa Air", (255, 107, 0), (108, 52, 131)),
    (re.compile(r"vistara", re.I), "Vistara", (91, 44, 111), (75, 0, 130)),
    (re.compile(r"emirates", re.I), "Emirates", (215, 25, 33), (139, 0, 0)),
    (re.compile(r"qatar", re.I), "Qatar Airways", (92, 10, 44), (139, 21, 56)),
    (re.compile(r"etihad", re.I), "Etihad", (189, 139, 19), (26, 26, 26)),
    (re.compile(r"singapore", re.I), "Singapore Airlines", (245, 210, 72), (26, 26, 26)),
    (re.compile(r"celebi", re.I), "Celebi Aviation", (0, 102, 161), (0, 68, 102)),
    (re.compile(r"bird", re.I), "Bird Group", (230, 126, 34), (179, 95, 18)),
    (re.compile(r"dnata", re.I), "dnata", (200, 16, 46), (139, 10, 30)),
    (re.compile(r"globe\s*ground", re.I), "Globe Ground India", (15, 118, 110), (17, 94, 89)),
    (re.compile(r"menzies", re.I), "Menzies Aviation", (30, 58, 95), (15, 39, 68)),
    (re.compile(r"runway2sky", re.I), "Runway2Sky", (2, 132, 199), (3, 105, 161)),
]

# Category → local photos under public/job-photos/
PHOTO_SETS = {
    "cabin": ["cabin-1.jpg", "cabin-2.jpg", "crew/crew-1.jpg", "crew/crew-2.jpg"],
    "ground": ["airport-1.jpg", "airport-2.jpg", "ground-1.jpg"],
    "pilot": ["cockpit-1.jpg", "runway-1.jpg", "plane-1.jpg"],
    "maintenance": ["hangar-1.jpg", "ground-1.jpg"],
    "default": ["plane-1.jpg", "plane-2.jpg", "runway-1.jpg", "airport-1.jpg"],
}

CITY_PHOTOS = {
    "dubai": "cities/dubai.jpg",
    "singapore": "cities/singapore.jpg",
    "delhi": "cities/delhi.jpg",
    "mumbai": "cities/mumbai.jpg",
    "bengaluru": "cities/bengaluru.jpg",
    "bangalore": "cities/bengaluru.jpg",
    "hyderabad": "cities/hyderabad.jpg",
}

# Royalty-free Unsplash downloads (direct image CDN). No LinkedIn scraping.
UNSPLASH_EXTRA = {
    "crew/crew-1.jpg": "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1200&q=80",
    "crew/crew-2.jpg": "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=1200&q=80",
    "cities/dubai.jpg": "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
    "cities/singapore.jpg": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    "cities/delhi.jpg": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
    "cities/mumbai.jpg": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    "cities/bengaluru.jpg": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80",
    "cities/hyderabad.jpg": "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1200&q=80",
}


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    path = FONT_BOLD if bold else FONT_REG
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default()


def sanitize_id(job_id: str) -> str:
    s = re.sub(r"[^a-zA-Z0-9_-]+", "-", str(job_id or "job").strip())
    s = s.strip("-")[:80]
    return s or "job"


def hash_id(job_id: str) -> int:
    return int(hashlib.md5(str(job_id).encode()).hexdigest()[:8], 16)


def get_brand(company: str) -> dict[str, Any]:
    raw = str(company or "Company")
    for rx, name, c1, c2 in BRANDS:
        if rx.search(raw):
            return {"name": name, "color": c1, "color2": c2}
    short = re.split(r"[|/–—]", raw)[0].strip() or "Company"
    return {"name": short[:42], "color": (14, 165, 233), "color2": (3, 105, 161)}


def categorize(job: dict) -> str:
    tags = " ".join(job.get("tags") or []) if isinstance(job.get("tags"), list) else ""
    blob = f"{job.get('title','')} {job.get('category','')} {job.get('department','')} {tags} {job.get('level','')}".lower()
    if re.search(r"cabin|flight\s*attendant|in[- ]?flight|cabin\s*crew|purser|steward", blob):
        return "cabin"
    if re.search(r"pilot|flight\s*ops|cockpit|captain|first\s*officer|\bfo\b|type\s*rating", blob):
        return "pilot"
    if re.search(r"maintenance|ame|a\.?m\.?e|engineer|mro|hangar|technic|avionics", blob):
        return "maintenance"
    if re.search(
        r"ground|airport|ramp|customer\s*experience|customer\s*service|check[- ]?in|passenger|handler|load\s*control|operations\s*agent|csc|csa|security|commercial",
        blob,
    ):
        return "ground"
    return "default"


def truncate(s: str, n: int) -> str:
    t = re.sub(r"\s+", " ", str(s or "")).strip()
    if len(t) <= n:
        return t
    return t[: n - 1].rstrip() + "…"


def wrap_text(draw: ImageDraw.ImageDraw, text: str, fnt, max_width: int, max_lines: int = 6) -> list[str]:
    words = str(text or "").split()
    if not words:
        return []
    lines: list[str] = []
    cur = ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if draw.textlength(trial, font=fnt) <= max_width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
            if len(lines) >= max_lines:
                break
    if cur and len(lines) < max_lines:
        lines.append(cur)
    if len(lines) > max_lines:
        lines = lines[:max_lines]
        lines[-1] = truncate(lines[-1], 40)
    return lines


def load_json_jobs(path: Path) -> list[dict]:
    if not path.exists():
        return []
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"[posters] could not parse {path}: {e}", file=sys.stderr)
        return []
    if isinstance(data, list):
        return [j for j in data if isinstance(j, dict) and j.get("id")]
    if isinstance(data, dict) and isinstance(data.get("jobs"), list):
        return [j for j in data["jobs"] if isinstance(j, dict) and j.get("id")]
    return []


def merge_jobs(*lists: list[dict]) -> list[dict]:
    m: dict[str, dict] = {}
    for lst in lists:
        for j in lst:
            jid = j.get("id")
            if jid and jid not in m:
                m[jid] = j
    return list(m.values())


def ensure_extra_photos() -> None:
    CITY_DIR.mkdir(parents=True, exist_ok=True)
    CREW_DIR.mkdir(parents=True, exist_ok=True)
    for rel, url in UNSPLASH_EXTRA.items():
        dest = PHOTO_DIR / rel
        if dest.exists() and dest.stat().st_size > 10_000:
            continue
        dest.parent.mkdir(parents=True, exist_ok=True)
        print(f"[posters] downloading {rel} …")
        try:
            req = urllib.request.Request(
                url,
                headers={"User-Agent": "Runway2SkyPosterBot/1.0 (aviation careers; +https://runway2sky.online)"},
            )
            with urllib.request.urlopen(req, timeout=45) as resp:
                data = resp.read()
            dest.write_bytes(data)
            print(f"[posters] saved {rel} ({len(data)} bytes)")
        except Exception as e:
            print(f"[posters] download failed for {rel}: {e}", file=sys.stderr)


def open_photo(rel: str) -> Image.Image | None:
    path = PHOTO_DIR / rel
    if not path.exists():
        return None
    try:
        img = Image.open(path).convert("RGB")
        return img
    except Exception as e:
        print(f"[posters] bad photo {rel}: {e}", file=sys.stderr)
        return None


def pick_main_photo(job: dict) -> tuple[str, str]:
    cat = categorize(job)
    candidates = PHOTO_SETS.get(cat, PHOTO_SETS["default"])
    # Prefer files that exist
    existing = [c for c in candidates if (PHOTO_DIR / c).exists()]
    pool = existing or [c for c in PHOTO_SETS["default"] if (PHOTO_DIR / c).exists()]
    if not pool:
        return cat, ""
    pick = pool[hash_id(job["id"]) % len(pool)]
    return cat, pick


def pick_city_photo(job: dict) -> str | None:
    loc = str(job.get("location") or "").lower()
    country = str(job.get("country") or "").lower()
    region = str(job.get("region") or "").lower()
    blob = f"{loc} {country} {region}"
    for key, rel in CITY_PHOTOS.items():
        if key in blob and (PHOTO_DIR / rel).exists():
            return rel
    # Gulf / international → Dubai skyline as aspirational strip
    if re.search(r"dubai|uae|gulf|qatar|doha|abu\s*dhabi|saudi|bahrain|oman|kuwait|international", blob):
        rel = CITY_PHOTOS["dubai"]
        if (PHOTO_DIR / rel).exists():
            return rel
    return None


def cover_crop(img: Image.Image, tw: int, th: int) -> Image.Image:
    iw, ih = img.size
    scale = max(tw / iw, th / ih)
    nw, nh = int(iw * scale), int(ih * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - tw) // 2
    top = (nh - th) // 2
    return img.crop((left, top, left + tw, top + th))


def rounded_rect(draw: ImageDraw.ImageDraw, box, fill, radius: int = 16):
    draw.rounded_rectangle(box, radius=radius, fill=fill)


def draw_pin(draw: ImageDraw.ImageDraw, x: int, y: int, color=(255, 255, 255)):
    # Simple map-pin: circle + triangle
    draw.ellipse((x, y, x + 18, y + 18), fill=color)
    draw.polygon([(x + 3, y + 14), (x + 15, y + 14), (x + 9, y + 26)], fill=color)
    draw.ellipse((x + 5, y + 5, x + 13, y + 13), fill=(30, 30, 30))


def is_gulf_or_intl(job: dict) -> bool:
    blob = f"{job.get('location','')} {job.get('country','')} {job.get('region','')} {' '.join(job.get('tags') or [])}".lower()
    return bool(
        re.search(
            r"dubai|uae|gulf|qatar|doha|abu\s*dhabi|saudi|bahrain|oman|kuwait|singapore|international|visa|abroad|middle\s*east",
            blob,
        )
    )


def benefits_for(job: dict) -> list[tuple[str, str]]:
    """Return list of (label, short icon letter)."""
    if is_gulf_or_intl(job):
        return [("Visa", "V"), ("Housing", "H"), ("Medical", "M"), ("Leave", "L")]
    return [("Training", "T"), ("Allowance", "A"), ("Medical", "M"), ("Shifts", "S")]


def eligibility_lines(job: dict) -> list[str]:
    elig = job.get("eligibility")
    if isinstance(elig, list) and elig:
        return [truncate(str(x), 72) for x in elig[:6]]
    items = []
    level = job.get("level") or ""
    if re.search(r"fresher|entry|trainee|junior", f"{level} {job.get('title','')}", re.I):
        items.append("Freshers / entry-level candidates welcome")
        items.append("Minimum 10+2 or diploma as per role")
    elif level:
        items.append(f"{level} level — relevant experience preferred")
        items.append("Valid licences / certifications as applicable")
    else:
        items.append("Open to qualified aviation candidates")
    if job.get("location"):
        items.append(f"Based in / relocate: {truncate(job['location'], 56)}")
    items.append("Strong communication & customer-service mindset")
    items.append("Willing to work shifts / rostered duties")
    return [truncate(x, 72) for x in items[:6]]


def nationality_badge(job: dict) -> str:
    blob = f"{job.get('title','')} {job.get('level','')} {' '.join(job.get('tags') or [])}".lower()
    elig = " ".join(job.get("eligibility") or []).lower()
    if "indian national" in elig or re.search(r"\bindia\b", str(job.get("location") or ""), re.I):
        if re.search(r"fresher|entry", blob):
            return "INDIAN · FRESHER"
        return "INDIAN NATIONALS"
    if is_gulf_or_intl(job):
        return "INTERNATIONAL"
    if re.search(r"fresher|entry", blob):
        return "FRESHERS WELCOME"
    return "NOW HIRING"


def compose_poster(job: dict) -> Image.Image:
    brand = get_brand(job.get("company") or "")
    cat, photo_rel = pick_main_photo(job)
    city_rel = pick_city_photo(job)
    canvas = Image.new("RGB", (W, H), brand["color2"])
    draw = ImageDraw.Draw(canvas)

    # --- Top brand bar ---
    bar_h = 118
    draw.rectangle((0, 0, W, bar_h), fill=brand["color"])
    # Secondary accent strip (Akasa purple, IndiGo navy, etc.)
    draw.rectangle((0, bar_h - 8, W, bar_h), fill=brand["color2"])

    f_hire = font(52, bold=True)
    f_badge = font(18, bold=True)
    f_airline = font(26, bold=True)
    hire_text = "WE ARE HIRING"
    draw.text((40, 22), hire_text, fill=(255, 255, 255), font=f_hire)
    draw.text((40, 78), truncate(brand["name"], 36), fill=(255, 255, 255), font=f_airline)

    badge = nationality_badge(job)
    bw = int(draw.textlength(badge, font=f_badge)) + 28
    bx0 = W - 40 - bw
    rounded_rect(draw, (bx0, 36, bx0 + bw, 72), fill=(0, 0, 0), radius=8)
    # translucent-ish via dark
    draw.text((bx0 + 14, 42), badge, fill=(255, 255, 255), font=f_badge)

    # --- Large photo mid section ---
    photo_top = bar_h
    photo_h = 520
    photo = open_photo(photo_rel) if photo_rel else None
    if photo:
        cropped = cover_crop(photo, W, photo_h)
        # Slight darken for text readability if needed
        cropped = ImageEnhance.Brightness(cropped).enhance(0.92)
        canvas.paste(cropped, (0, photo_top))
    else:
        draw.rectangle((0, photo_top, W, photo_top + photo_h), fill=brand["color2"])

    # Gradient scrim at bottom of photo for title bleed
    for i in range(90):
        alpha = int(180 * (i / 90))
        overlay = Image.new("RGBA", (W, 1), (*brand["color2"], alpha))
        base = canvas.crop((0, photo_top + photo_h - 90 + i, W, photo_top + photo_h - 89 + i)).convert("RGBA")
        blended = Image.alpha_composite(base, overlay).convert("RGB")
        canvas.paste(blended, (0, photo_top + photo_h - 90 + i))

    # Optional city strip
    y = photo_top + photo_h
    if city_rel:
        city_h = 110
        city = open_photo(city_rel)
        if city:
            strip = cover_crop(city, W, city_h)
            strip = ImageEnhance.Brightness(strip).enhance(0.75)
            canvas.paste(strip, (0, y))
            # Location label on strip
            loc_short = truncate(str(job.get("location") or "").split(",")[0], 42)
            f_city = font(22, bold=True)
            draw = ImageDraw.Draw(canvas)
            draw_pin(draw, 36, y + 40)
            draw.text((64, y + 42), loc_short or "Location", fill=(255, 255, 255), font=f_city)
            y += city_h
        else:
            draw = ImageDraw.Draw(canvas)
    else:
        draw = ImageDraw.Draw(canvas)

    # --- Text panel ---
    panel_top = y
    draw.rectangle((0, panel_top, W, H), fill=(248, 250, 252))  # slate-50
    # Brand left accent
    draw.rectangle((0, panel_top, 12, H), fill=brand["color"])

    pad = 40
    ty = panel_top + 28

    f_title = font(36, bold=True)
    f_co = font(22, bold=True)
    f_meta = font(22, bold=True)
    f_body = font(20, bold=False)
    f_small = font(16, bold=True)
    f_tiny = font(15, bold=False)

    title_lines = wrap_text(draw, job.get("title") or "Open Position", f_title, W - pad * 2, 2)
    for line in title_lines:
        draw.text((pad, ty), line, fill=(15, 23, 42), font=f_title)
        ty += 42
    ty += 4
    draw.text((pad, ty), truncate(brand["name"], 40), fill=brand["color"], font=f_co)
    ty += 36

    # Salary block
    salary = job.get("salary") or "As per airline norms"
    rounded_rect(draw, (pad, ty, W - pad, ty + 44), fill=(255, 255, 255), radius=10)
    draw.rectangle((pad, ty, pad + 8, ty + 44), fill=brand["color"])
    draw.text((pad + 20, ty + 10), f"Salary  ·  {truncate(salary, 48)}", fill=(15, 23, 42), font=f_meta)
    ty += 56

    # Location block
    loc = job.get("location") or "India"
    rounded_rect(draw, (pad, ty, W - pad, ty + 44), fill=(255, 255, 255), radius=10)
    draw_pin(draw, pad + 18, ty + 10, color=brand["color"])
    draw.text((pad + 48, ty + 10), truncate(loc, 52), fill=(30, 41, 59), font=f_body)
    ty += 58

    # Qualifications
    draw.text((pad, ty), "QUALIFICATIONS", fill=brand["color2"], font=f_small)
    ty += 28
    for item in eligibility_lines(job)[:5]:
        # bullet
        draw.ellipse((pad + 4, ty + 8, pad + 14, ty + 18), fill=brand["color"])
        lines = wrap_text(draw, item, f_body, W - pad * 2 - 30, 2)
        for i, ln in enumerate(lines):
            draw.text((pad + 24, ty), ln, fill=(51, 65, 85), font=f_body)
            ty += 26
        ty += 4
        if ty > H - 210:
            break

    # Benefits box
    bens = benefits_for(job)
    box_top = H - 168
    if ty > box_top - 10:
        box_top = min(ty + 8, H - 168)
    rounded_rect(draw, (pad, box_top, W - pad, box_top + 100), fill=(255, 255, 255), radius=14)
    draw.rectangle((pad, box_top, W - pad, box_top + 6), fill=brand["color"])
    draw.text((pad + 18, box_top + 14), "BENEFITS", fill=brand["color2"], font=f_small)

    slot_w = (W - pad * 2 - 36) // 4
    for i, (label, letter) in enumerate(bens):
        cx = pad + 18 + i * slot_w
        cy = box_top + 42
        draw.rounded_rectangle((cx, cy, cx + 36, cy + 36), radius=8, fill=brand["color"])
        # center letter
        lw = draw.textlength(letter, font=f_small)
        draw.text((cx + (36 - lw) / 2, cy + 8), letter, fill=(255, 255, 255), font=f_small)
        draw.text((cx + 44, cy + 10), label, fill=(30, 41, 59), font=f_tiny)

    # Footer
    draw.rectangle((0, H - 48, W, H), fill=brand["color2"])
    f_foot = font(18, bold=True)
    draw.text((40, H - 34), "Runway2Sky", fill=(255, 255, 255), font=f_foot)
    foot2 = "runway2sky.online"
    fw = draw.textlength(foot2, font=f_foot)
    draw.text((W - 40 - fw, H - 34), foot2, fill=(203, 213, 225), font=f_foot)

    return canvas


def save_optimized(img: Image.Image, out_path: Path) -> int:
    """Save as JPEG (quality tuned) under .jpg; also write .png alias only if tiny."""
    out_path.parent.mkdir(parents=True, exist_ok=True)
    # Prefer JPEG for photo-heavy posters
    jpg_path = out_path.with_suffix(".jpg")
    quality = 85
    data = None
    while quality >= 55:
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=quality, optimize=True, progressive=True)
        data = buf.getvalue()
        if len(data) <= MAX_BYTES:
            break
        quality -= 5
    jpg_path.write_bytes(data)
    # Remove stale SVG/PNG for this id so UI doesn't pick old assets
    for stale in (out_path.with_suffix(".svg"), out_path.with_suffix(".png")):
        if stale.exists() and stale != jpg_path:
            try:
                stale.unlink()
            except OSError:
                pass
    return len(data)


def poster_path_for(job_id: str) -> Path:
    return OUT_DIR / f"{sanitize_id(job_id)}.jpg"


def needs_generate(job: dict, force: bool) -> bool:
    if force:
        return True
    p = poster_path_for(job["id"])
    if not p.exists() or p.stat().st_size < 5_000:
        return True
    # Also regenerate if only old SVG exists (caller may have cleaned)
    return False


def write_map(jobs: list[dict], photo_meta: dict[str, dict]) -> None:
    mapping = {}
    for job in jobs:
        jid = job["id"]
        sid = sanitize_id(jid)
        jpg = f"/job-posters/{sid}.jpg"
        meta = photo_meta.get(jid, {})
        mapping[jid] = {
            "poster": jpg,
            "photo": meta.get("photo"),
            "category": meta.get("category"),
            "format": "jpg",
            "size": "1080x1350",
        }
    MAP_PATH.parent.mkdir(parents=True, exist_ok=True)
    MAP_PATH.write_text(json.dumps(mapping, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate LinkedIn-style hiring posters")
    parser.add_argument("--force", action="store_true", help="Regenerate all posters")
    parser.add_argument("--only-missing", action="store_true", help="Only create missing posters (default)")
    parser.add_argument("--job-id", type=str, default="", help="Generate a single job id")
    parser.add_argument("--skip-download", action="store_true", help="Do not fetch extra Unsplash photos")
    args = parser.parse_args()
    force = args.force
    only_missing = args.only_missing or not force

    if not args.skip_download:
        ensure_extra_photos()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    live = load_json_jobs(LIVE_JOBS)
    featured = load_json_jobs(FEATURED_JSON)
    jobs = merge_jobs(live, featured)

    if args.job_id:
        jobs = [j for j in jobs if j.get("id") == args.job_id]
        if not jobs:
            # Still allow synthesizing from live list miss — fail soft
            print(f"[posters] job id not found: {args.job_id}", file=sys.stderr)
            return 1

    if not jobs:
        print("[posters] No jobs found", file=sys.stderr)
        return 1

    # Featured first
    jobs = sorted(jobs, key=lambda j: (0 if j.get("featured") else 1, str(j.get("id"))))

    photo_meta: dict[str, dict] = {}
    generated = 0
    skipped = 0

    for job in jobs:
        sid = sanitize_id(job["id"])
        out = OUT_DIR / f"{sid}.jpg"
        cat, photo_rel = pick_main_photo(job)
        photo_meta[job["id"]] = {
            "photo": f"/job-photos/{photo_rel}" if photo_rel else None,
            "category": cat,
        }
        if only_missing and not force and out.exists() and out.stat().st_size >= 5_000:
            skipped += 1
            continue
        try:
            img = compose_poster(job)
            nbytes = save_optimized(img, out)
            generated += 1
            print(f"[posters] {sid}.jpg  {nbytes // 1024}KB  ({cat})")
        except Exception as e:
            print(f"[posters] FAILED {sid}: {e}", file=sys.stderr)

    # Always refresh map for all known jobs (including skipped)
    write_map(jobs if not args.job_id else merge_jobs(live, featured), photo_meta if not args.job_id else {
        **{j["id"]: photo_meta.get(j["id"], {}) for j in merge_jobs(live, featured)},
        **photo_meta,
    })

    # If single job, rebuild full map properly
    if args.job_id:
        all_jobs = merge_jobs(live, featured)
        full_meta = {}
        for j in all_jobs:
            c, pr = pick_main_photo(j)
            full_meta[j["id"]] = {"photo": f"/job-photos/{pr}" if pr else None, "category": c}
        write_map(all_jobs, full_meta)

    print(f"[posters] done — generated={generated} skipped={skipped} map={MAP_PATH}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
