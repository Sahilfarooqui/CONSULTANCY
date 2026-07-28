const appConfig = {
  brand: {
    name: 'Runway2Sky',
    tagline: 'Your runway to aviation careers',
    domain: 'runway2sky.online',
    url: 'https://runway2sky.online',
    shortDescription:
      'India aviation jobs board for freshers — IndiGo, SpiceJet, Air India, Akasa and airport ground staff roles. Auto-updated openings plus career guidance and QATI training.',
  },
  contact: {
    address: [
      'AL MANA TWIN TOWER (B) 14 (A)',
      'Al Saad Main Street After Ramada Signal,',
      'Doha, Qatar',
    ],
    /** Display phone */
    phone: '9289199839',
    /** tel: link */
    phoneTel: '+919289199839',
    email: 'runway2skyy@gmail.com',
    /** WhatsApp digits with country code (India) */
    whatsapp: '919289199839',
  },
  /**
   * Formspree form ID — applications & contact go here as email.
   * Create free form at https://formspree.io → paste ID below
   * Or set REACT_APP_FORMSPREE_ID in Render env.
   */
  formspreeId: process.env.REACT_APP_FORMSPREE_ID || 'xvgrqjny',
  partners: {
    courses: {
      name: 'Qatar Advanced Training Institute',
      shortName: 'QATI',
      url: 'https://qataradvancedtraininginstitute.store/',
      description:
        'Our official training partner. Upskill with professional aviation and industry courses designed for career-ready graduates and working professionals.',
    },
  },
  social: {
    linkedin: 'https://www.linkedin.com/',
    instagram: '#',
  },
};

export default appConfig;
