# Runway2Sky — [runway2sky.online](https://runway2sky.online)

Aviation careers platform: **auto-updated job board** + training partner **Qatar Advanced Training Institute**.

## Automatic jobs (how it works)

Jobs are aggregated every hour (server) or every 6 hours (GitHub Action) from:

| Source | Needs key? | Notes |
|--------|------------|--------|
| **Adzuna** | Free developer key | Best source — airline, airport, cabin crew, MRO worldwide |
| **JSearch (RapidAPI)** | Free tier key | Google for Jobs / LinkedIn-indexed listings |
| Remotive, RemoteOK, Arbeitnow, Jobicy, The Muse | No | Filtered strictly for aviation-related roles |
| Featured / Direct | No | Your manual placements in `src/data/jobs.js` |

We **do not scrape LinkedIn** (against their terms). Adzuna + JSearch legally surface many of the same openings that appear on LinkedIn and company career pages.

### Get free Adzuna keys (2 minutes — required for full auto-feed)

1. Sign up: [https://developer.adzuna.com/](https://developer.adzuna.com/)
2. Create an app → copy **App ID** and **App Key**
3. Create `.env` from `.env.example`:

```env
ADZUNA_APP_ID=your_id
ADZUNA_APP_KEY=your_key
```

4. Run:

```bash
npm run fetch-jobs
```

You should see many **live** aviation roles written to `public/data/live-jobs.json`.

Optional: add `RAPIDAPI_KEY` for JSearch (Google Jobs).

## Local development

```bash
npm install --legacy-peer-deps

# Terminal A — API + auto job refresh
npm run server

# Terminal B — React site (proxies /api → :4000)
npm start

# Or both together:
npm run dev
```

- Site: http://localhost:3000  
- Jobs API: http://localhost:4000/api/jobs  
- Force refresh: http://localhost:4000/api/jobs?refresh=1  

## Production (runway2sky.online)

### Option A — Render (recommended)

1. Push this repo to GitHub  
2. New **Web Service** on [Render](https://render.com) (or use `render.yaml`)  
3. Build: `npm install --legacy-peer-deps && npm run build`  
4. Start: `npm run start:prod`  
5. Add env vars: `ADZUNA_APP_ID`, `ADZUNA_APP_KEY`  
6. In domain registrar for **runway2sky.online**, point DNS to Render (A/CNAME as they show)  

The Node server serves the React build **and** refreshes jobs every hour.

### Option B — Static host + GitHub Action

1. Host `build/` on Netlify/Cloudflare Pages  
2. Enable workflow `.github/workflows/fetch-jobs.yml`  
3. Add repo secrets: `ADZUNA_APP_ID`, `ADZUNA_APP_KEY`  
4. Action commits updated `public/data/live-jobs.json` every 6 hours  

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run fetch-jobs` | Pull latest jobs → `public/data/live-jobs.json` |
| `npm run server` | API + static server |
| `npm run dev` | React + API together |
| `npm run build` | Production build (fetches jobs first) |
| `npm run start:prod` | Serve build + API |

## Adding featured / direct jobs

Edit `src/data/jobs.js` (and optionally `public/data/featured-jobs.json`).

## Contact

Formspree form on `/contact`. Update `src/config/appConfig.js` for email/phone.
