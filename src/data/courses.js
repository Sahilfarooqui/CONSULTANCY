/**
 * QATI certificates recommended by Runway2Sky.
 * Deep-links to qataradvancedtraininginstitute.store course pages.
 */

const COURSES_PLATFORM = 'https://qataradvancedtraininginstitute.store';
const courseUrl = (id) => `${COURSES_PLATFORM}/courses/${id}`;

const courses = [
  {
    id: 'crs-001',
    qatiId: 7,
    title: 'Cabin Crew Foundation Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '4–6 weeks',
    mode: 'Online + Practical modules',
    level: 'Beginner',
    category: 'Cabin Crew',
    certificate: true,
    requiredFor: ['Cabin Crew'],
    price: 'QAR 899',
    location: 'Qatar (online worldwide)',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    description:
      'Passenger service, safety awareness, grooming standards, and airline interview readiness for cabin crew freshers.',
    outcomes: ['Service excellence', 'Safety basics', 'Interview prep', 'Certificate'],
    url: courseUrl(7),
  },
  {
    id: 'crs-002',
    qatiId: 8,
    title: 'Airport Ground Operations Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '3–5 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Ground Operations',
    certificate: true,
    requiredFor: ['Ground Operations', 'Ground Handling', 'Customer Experience'],
    price: 'QAR 799',
    location: 'Qatar (online worldwide)',
    image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=800&q=80',
    description:
      'Check-in, boarding, baggage concepts, and airport customer service standards for ground staff and GHA roles.',
    outcomes: ['Check-in flow', 'Passenger handling', 'Airport ops', 'Certificate'],
    url: courseUrl(8),
  },
  {
    id: 'crs-003',
    qatiId: 9,
    title: 'GDS Ticketing Certificate (Amadeus / Galileo)',
    partner: 'Qatar Advanced Training Institute',
    duration: '4 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Commercial',
    certificate: true,
    requiredFor: ['Commercial'],
    price: 'QAR 999',
    location: 'Qatar (online worldwide)',
    image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=800&q=80',
    description:
      'Airline reservation systems used by GSAs and commercial teams. Ideal for ticketing & call-centre freshers.',
    outcomes: ['GDS commands', 'PNR management', 'Fare basics', 'Certificate'],
    url: courseUrl(9),
  },
  {
    id: 'crs-004',
    qatiId: 10,
    title: 'Aviation English & Communication Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '3 weeks',
    mode: 'Online',
    level: 'All levels',
    category: 'Soft Skills',
    certificate: true,
    requiredFor: [
      'Cabin Crew',
      'Ground Operations',
      'Ground Handling',
      'Customer Experience',
      'Commercial',
      'Hospitality',
      'Graduate / Trainee',
      'Corporate',
    ],
    price: 'QAR 599',
    location: 'Qatar (online worldwide)',
    image: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=800&q=80',
    description:
      'English for airline interviews, passenger interaction, and professional workplace communication.',
    outcomes: ['Interview English', 'Announcements', 'Soft skills', 'Certificate'],
    url: courseUrl(10),
  },
  {
    id: 'crs-005',
    qatiId: 11,
    title: 'Aircraft Maintenance Awareness Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '5 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Engineering & MRO',
    certificate: true,
    requiredFor: ['Engineering & MRO'],
    price: 'QAR 1,099',
    location: 'Qatar (online worldwide)',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80',
    description:
      'Aircraft systems intro, hangar safety culture, and pathway awareness for AME / MRO freshers.',
    outcomes: ['Systems overview', 'Safety culture', 'Career paths', 'Certificate'],
    url: courseUrl(11),
  },
  {
    id: 'crs-006',
    qatiId: 12,
    title: 'Aviation Security Awareness (AVSEC) Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '2 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Security',
    certificate: true,
    requiredFor: ['Security', 'Ground Operations'],
    price: 'QAR 499',
    location: 'Qatar (online worldwide)',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80',
    description:
      'Core AVSEC concepts for airport screeners and ground staff. Complements on-the-job certification.',
    outcomes: ['AVSEC basics', 'Threat awareness', 'Procedures', 'Certificate'],
    url: courseUrl(12),
  },
  {
    id: 'crs-007',
    qatiId: 13,
    title: 'Flight Operations Fundamentals Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '4 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Flight Operations',
    certificate: true,
    requiredFor: ['Flight Operations', 'Flight Deck'],
    price: 'QAR 899',
    location: 'Qatar (online worldwide)',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80',
    description:
      'Basics of flight planning awareness, load concepts, and airline operations control for junior ops roles.',
    outcomes: ['Ops awareness', 'Load concepts', 'Duty basics', 'Certificate'],
    url: courseUrl(13),
  },
  {
    id: 'crs-008',
    qatiId: 14,
    title: 'Air Cargo Operations Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '3 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Cargo',
    certificate: true,
    requiredFor: ['Cargo'],
    price: 'QAR 749',
    location: 'Qatar (online worldwide)',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    description:
      'Air freight documentation, warehouse flow, and airline cargo handover basics for freshers.',
    outcomes: ['Cargo docs', 'Warehouse flow', 'Airline handover', 'Certificate'],
    url: courseUrl(14),
  },
  {
    id: 'crs-009',
    qatiId: 15,
    title: 'Airport Hospitality & Lounge Service Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '3 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Hospitality',
    certificate: true,
    requiredFor: ['Hospitality'],
    price: 'QAR 699',
    location: 'Qatar (online worldwide)',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
    description:
      'Premium guest handling, lounge service standards, and grooming for airport hospitality roles.',
    outcomes: ['Guest handling', 'Service standards', 'Grooming', 'Certificate'],
    url: courseUrl(15),
  },
  {
    id: 'crs-010',
    qatiId: 16,
    title: 'Aviation Career Readiness Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '2–3 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Graduate / Trainee',
    certificate: true,
    requiredFor: ['Graduate / Trainee', 'Corporate', 'Aviation'],
    price: 'QAR 449',
    location: 'Qatar (online worldwide)',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    description:
      'CV, interview, and industry overview certificate for graduates entering airline / airport careers.',
    outcomes: ['CV prep', 'Interview skills', 'Industry overview', 'Certificate'],
    url: courseUrl(16),
  },
  {
    id: 'crs-011',
    qatiId: 17,
    title: 'Customer Experience for Airlines Certificate',
    partner: 'Qatar Advanced Training Institute',
    duration: '3–4 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Customer Experience',
    certificate: true,
    requiredFor: ['Customer Experience'],
    price: 'QAR 799',
    location: 'Qatar (online worldwide)',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
    description:
      'CX standards for airline and airport customer experience teams — passenger journey, service recovery, NPS.',
    outcomes: ['Passenger journey', 'Service recovery', 'CX metrics', 'Certificate'],
    url: courseUrl(17),
  },
];

export const MAX_CERTS_PER_JOB = 2;

export function getCertificatesForJob(job = {}) {
  const category = (job.category || '').trim();
  const blob = `${job.title || ''} ${job.description || ''} ${(job.tags || []).join(' ')}`.toLowerCase();

  const roleMatched = courses.filter((c) => {
    if (c.id === 'crs-004' || c.id === 'crs-010') return false;
    if (c.requiredFor && c.requiredFor.includes(category)) return true;
    if (c.category && c.category === category) return true;
    if (/cabin|flight attendant|purser|in-flight|inflight/.test(blob) && c.id === 'crs-001') return true;
    if (
      /ground|ramp|baggage|check-in|passenger service|psa|gha|ground handling|customer experience|guest experience/.test(
        blob
      ) &&
      (c.id === 'crs-002' || c.id === 'crs-011')
    )
      return true;
    if (/ticket|reservation|gds|call centre|call center|customer care|retail/.test(blob) && c.id === 'crs-003')
      return true;
    if (/maintenance|ame|mro|avionics|engineer/.test(blob) && c.id === 'crs-005') return true;
    if (/security|avsec|screener/.test(blob) && c.id === 'crs-006') return true;
    if (/flight ops|load control|dispatch|operations officer/.test(blob) && c.id === 'crs-007') return true;
    if (/cargo|freight/.test(blob) && c.id === 'crs-008') return true;
    if (/lounge|hospitality|host/.test(blob) && c.id === 'crs-009') return true;
    return false;
  });

  roleMatched.sort((a, b) => {
    const aHit = a.requiredFor?.includes(category) || a.category === category ? 0 : 1;
    const bHit = b.requiredFor?.includes(category) || b.category === category ? 0 : 1;
    return aHit - bHit;
  });

  const list = [];
  if (roleMatched[0]) list.push(roleMatched[0]);

  const english = courses.find((c) => c.id === 'crs-004');
  const readiness = courses.find((c) => c.id === 'crs-010');

  if (list.length < MAX_CERTS_PER_JOB) {
    if (english && !list.find((c) => c.id === english.id)) list.push(english);
    else if (roleMatched[1]) list.push(roleMatched[1]);
    else if (readiness && !list.find((c) => c.id === readiness.id)) list.push(readiness);
  }

  if (!list.length && readiness) list.push(readiness);
  if (!list.length && english) list.push(english);
  if (!list.length && courses[0]) list.push(courses[0]);

  return list.slice(0, MAX_CERTS_PER_JOB);
}

export function getPrimaryCertificate(job) {
  const list = getCertificatesForJob(job);
  return list[0] || courses.find((c) => c.id === 'crs-010') || courses[0];
}

export { COURSES_PLATFORM, courseUrl };
export default courses;
