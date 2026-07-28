/**
 * QATI (Qatar Advanced Training Institute) certificates.
 * Available on: https://qataradvancedtraininginstitute.store/
 * Mapped to job categories so every role shows required / recommended certs.
 */

const COURSES_PLATFORM = 'https://qataradvancedtraininginstitute.store/';

const courses = [
  {
    id: 'crs-001',
    title: 'Cabin Crew Foundation Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '4–6 weeks',
    mode: 'Online + Practical modules',
    level: 'Beginner',
    category: 'Cabin Crew',
    certificate: true,
    requiredFor: ['Cabin Crew'],
    price: 'See QATI platform',
    location: 'Qatar (online access worldwide)',
    image:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    description:
      'Passenger service, safety awareness, grooming standards, and airline interview readiness for cabin crew freshers.',
    outcomes: ['Service excellence', 'Safety basics', 'Interview prep', 'Certificate'],
    url: COURSES_PLATFORM,
  },
  {
    id: 'crs-002',
    title: 'Airport Ground Operations Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '3–5 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Ground Operations',
    certificate: true,
    requiredFor: ['Ground Operations'],
    price: 'See QATI platform',
    location: 'Qatar (online access worldwide)',
    image:
      'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=800&q=80',
    description:
      'Check-in, boarding, baggage concepts, and airport customer service standards for ground staff roles.',
    outcomes: ['Check-in flow', 'Passenger handling', 'Airport ops', 'Certificate'],
    url: COURSES_PLATFORM,
  },
  {
    id: 'crs-003',
    title: 'GDS Ticketing Certificate (Amadeus / Galileo)',
    partner: 'Qatar Advanced Training Institute',
    duration: '4 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Commercial',
    certificate: true,
    requiredFor: ['Commercial'],
    price: 'See QATI platform',
    location: 'Qatar (online access worldwide)',
    image:
      'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=800&q=80',
    description:
      'Airline reservation systems used by GSAs and commercial teams. Ideal for ticketing & call-centre freshers.',
    outcomes: ['GDS commands', 'PNR management', 'Fare basics', 'Certificate'],
    url: COURSES_PLATFORM,
  },
  {
    id: 'crs-004',
    title: 'Aviation English & Communication Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '3 weeks',
    mode: 'Online',
    level: 'All levels',
    category: 'Soft Skills',
    certificate: true,
    requiredFor: ['Cabin Crew', 'Ground Operations', 'Commercial', 'Hospitality', 'Graduate / Trainee', 'Corporate'],
    price: 'See QATI platform',
    location: 'Qatar (online access worldwide)',
    image:
      'https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=800&q=80',
    description:
      'English for airline interviews, passenger interaction, and professional workplace communication.',
    outcomes: ['Interview English', 'Announcements', 'Soft skills', 'Certificate'],
    url: COURSES_PLATFORM,
  },
  {
    id: 'crs-005',
    title: 'Aircraft Maintenance Awareness Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '5 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Engineering & MRO',
    certificate: true,
    requiredFor: ['Engineering & MRO'],
    price: 'See QATI platform',
    location: 'Qatar (online access worldwide)',
    image:
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80',
    description:
      'Aircraft systems intro, hangar safety culture, and pathway awareness for AME / MRO freshers.',
    outcomes: ['Systems overview', 'Safety culture', 'Career paths', 'Certificate'],
    url: COURSES_PLATFORM,
  },
  {
    id: 'crs-006',
    title: 'Aviation Security Awareness (AVSEC) Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '2 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Security',
    certificate: true,
    requiredFor: ['Security', 'Ground Operations'],
    price: 'See QATI platform',
    location: 'Qatar (online access worldwide)',
    image:
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80',
    description:
      'Core AVSEC concepts for airport screeners and ground staff. Complements on-the-job certification.',
    outcomes: ['AVSEC basics', 'Threat awareness', 'Procedures', 'Certificate'],
    url: COURSES_PLATFORM,
  },
  {
    id: 'crs-007',
    title: 'Flight Operations Fundamentals Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '4 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Flight Operations',
    certificate: true,
    requiredFor: ['Flight Operations', 'Flight Deck'],
    price: 'See QATI platform',
    location: 'Qatar (online access worldwide)',
    image:
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80',
    description:
      'Basics of flight planning awareness, load concepts, and airline operations control for junior ops roles.',
    outcomes: ['Ops awareness', 'Load concepts', 'Duty basics', 'Certificate'],
    url: COURSES_PLATFORM,
  },
  {
    id: 'crs-008',
    title: 'Air Cargo Operations Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '3 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Cargo',
    certificate: true,
    requiredFor: ['Cargo'],
    price: 'See QATI platform',
    location: 'Qatar (online access worldwide)',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    description:
      'Air freight documentation, warehouse flow, and airline cargo handover basics for freshers.',
    outcomes: ['Cargo docs', 'Warehouse flow', 'Airline handover', 'Certificate'],
    url: COURSES_PLATFORM,
  },
  {
    id: 'crs-009',
    title: 'Airport Hospitality & Lounge Service Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '3 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Hospitality',
    certificate: true,
    requiredFor: ['Hospitality'],
    price: 'See QATI platform',
    location: 'Qatar (online access worldwide)',
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
    description:
      'Premium guest handling, lounge service standards, and grooming for airport hospitality roles.',
    outcomes: ['Guest handling', 'Service standards', 'Grooming', 'Certificate'],
    url: COURSES_PLATFORM,
  },
  {
    id: 'crs-010',
    title: 'Aviation Career Readiness Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '2–3 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Graduate / Trainee',
    certificate: true,
    requiredFor: ['Graduate / Trainee', 'Corporate', 'Aviation'],
    price: 'See QATI platform',
    location: 'Qatar (online access worldwide)',
    image:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    description:
      'CV, interview, and industry overview certificate for graduates entering airline / airport careers.',
    outcomes: ['CV prep', 'Interview skills', 'Industry overview', 'Certificate'],
    url: COURSES_PLATFORM,
  },
];

/**
 * Return QATI certificates relevant to a job (by category + keywords).
 * Always includes at least Aviation English or Career Readiness as baseline.
 */
export function getCertificatesForJob(job = {}) {
  const category = (job.category || '').trim();
  const blob = `${job.title || ''} ${job.description || ''} ${(job.tags || []).join(' ')}`.toLowerCase();

  const matched = courses.filter((c) => {
    if (c.requiredFor && c.requiredFor.includes(category)) return true;
    if (c.category && c.category === category) return true;
    // keyword fallbacks
    if (/cabin|flight attendant|purser|in-flight|inflight/.test(blob) && c.id === 'crs-001') return true;
    if (/ground|ramp|baggage|check-in|passenger service|psa/.test(blob) && c.id === 'crs-002') return true;
    if (/ticket|reservation|gds|call centre|call center|customer care|retail/.test(blob) && c.id === 'crs-003')
      return true;
    if (/maintenance|ame|mro|avionics|engineer/.test(blob) && c.id === 'crs-005') return true;
    if (/security|avsec|screener/.test(blob) && c.id === 'crs-006') return true;
    if (/flight ops|load control|dispatch|operations officer/.test(blob) && c.id === 'crs-007') return true;
    if (/cargo|freight/.test(blob) && c.id === 'crs-008') return true;
    if (/lounge|hospitality|host/.test(blob) && c.id === 'crs-009') return true;
    return false;
  });

  // Always require Aviation English as soft-skill cert for India fresher pipeline
  const english = courses.find((c) => c.id === 'crs-004');
  const readiness = courses.find((c) => c.id === 'crs-010');

  const byId = new Map();
  for (const c of matched) byId.set(c.id, c);
  if (english) byId.set(english.id, english);
  if (!byId.size && readiness) byId.set(readiness.id, readiness);

  // Primary cert first (role-specific), then English
  const list = Array.from(byId.values());
  list.sort((a, b) => {
    if (a.id === 'crs-004') return 1;
    if (b.id === 'crs-004') return -1;
    if (a.requiredFor?.includes(category)) return -1;
    if (b.requiredFor?.includes(category)) return 1;
    return 0;
  });

  return list;
}

/** Primary (must-select) certificate for a job */
export function getPrimaryCertificate(job) {
  const list = getCertificatesForJob(job);
  return list[0] || courses.find((c) => c.id === 'crs-010') || courses[0];
}

export { COURSES_PLATFORM };
export default courses;
