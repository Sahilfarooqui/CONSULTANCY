/**
 * Featured courses delivered via Qatar Advanced Training Institute.
 * Enrolment and learning happen on the partner platform.
 */

const COURSES_PLATFORM = 'https://qataradvancedtraininginstitute.store/';

const courses = [
  {
    id: 'crs-001',
    title: 'Cabin Crew Foundation Programme',
    partner: 'Qatar Advanced Training Institute',
    duration: '4–6 weeks',
    mode: 'Online + Practical',
    level: 'Beginner',
    category: 'Cabin Crew',
    price: 'See platform',
    image:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    description:
      'Build passenger service, safety drills awareness, grooming standards, and interview readiness for airline cabin crew roles.',
    outcomes: ['Service excellence', 'Safety basics', 'Interview prep'],
    url: COURSES_PLATFORM,
  },
  {
    id: 'crs-002',
    title: 'Airport Ground Operations',
    partner: 'Qatar Advanced Training Institute',
    duration: '3–5 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Ground Operations',
    price: 'See platform',
    image:
      'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=800&q=80',
    description:
      'Learn check-in procedures, boarding coordination, baggage handling concepts, and airport customer service standards.',
    outcomes: ['Check-in flow', 'Passenger handling', 'Airport ops'],
    url: COURSES_PLATFORM,
  },
  {
    id: 'crs-003',
    title: 'GDS Ticketing (Amadeus / Galileo)',
    partner: 'Qatar Advanced Training Institute',
    duration: '4 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Commercial',
    price: 'See platform',
    image:
      'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=800&q=80',
    description:
      'Master airline reservation systems used by travel agencies and airline commercial teams. Ideal for freshers seeking ticketing roles.',
    outcomes: ['GDS commands', 'PNR management', 'Fare basics'],
    url: COURSES_PLATFORM,
  },
  {
    id: 'crs-004',
    title: 'Aviation English & Communication',
    partner: 'Qatar Advanced Training Institute',
    duration: '3 weeks',
    mode: 'Online',
    level: 'All levels',
    category: 'Soft Skills',
    price: 'See platform',
    image:
      'https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=800&q=80',
    description:
      'Industry-focused English for interviews, passenger announcements style, and professional workplace communication.',
    outcomes: ['Interview English', 'Announcements', 'Workplace soft skills'],
    url: COURSES_PLATFORM,
  },
  {
    id: 'crs-005',
    title: 'Aircraft Maintenance Awareness',
    partner: 'Qatar Advanced Training Institute',
    duration: '5 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Engineering & MRO',
    price: 'See platform',
    image:
      'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80',
    description:
      'Introduction to aircraft systems, hangar safety, and pathways into AMT / avionics careers for technical freshers.',
    outcomes: ['Systems overview', 'Safety culture', 'Career paths'],
    url: COURSES_PLATFORM,
  },
  {
    id: 'crs-006',
    title: 'Aviation Security Awareness (AVSEC)',
    partner: 'Qatar Advanced Training Institute',
    duration: '2 weeks',
    mode: 'Online',
    level: 'Beginner',
    category: 'Security',
    price: 'See platform',
    image:
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80',
    description:
      'Core aviation security concepts for airport screeners and ground staff. Complements on-the-job certification.',
    outcomes: ['AVSEC basics', 'Threat awareness', 'Procedures'],
    url: COURSES_PLATFORM,
  },
];

export { COURSES_PLATFORM };
export default courses;
