/**
 * Generate vacancies for 100+ global airlines (ME, US, UK, Australia, Asia, etc.)
 */
import globalAirlines from './globalAirlines';

function cabinEligibility(airline) {
  const gulf = /UAE|Qatar|Saudi|Bahrain|Oman|Kuwait/i.test(airline.country);
  return [
    gulf ? 'Open to international candidates (passport required)' : 'Right to work / visa status as per airline policy',
    'Minimum age 18–21+ (as per airline recruitment notice)',
    'High school diploma / equivalent or higher',
    'Fluent English (ICAO language proficiency preferred for some roles)',
    'Height & weight proportionate — airline medical standards apply',
    'Customer service orientation; swimming ability often required for cabin crew',
    'Willing to relocate to base: ' + airline.base,
    'Clean background check; medical fitness for flying',
  ];
}

function cxEligibility(airline) {
  return [
    'Right to work in ' + airline.country + ' (or visa sponsorship if advertised)',
    'Secondary education minimum; degree preferred for some markets',
    'Excellent English communication',
    'Strong customer service skills',
    'Comfortable with airport / shift work',
    'Computer literacy for DCS / CRM systems',
    'Based at or willing to work near: ' + airline.base,
  ];
}

function groundEligibility(airline) {
  return [
    'Right to work in ' + airline.country,
    'High school / secondary education',
    'Physically fit for airport duties',
    'English for operational communication',
    'Shift flexibility including nights and weekends',
    'Security clearance / background verification',
    'Location: ' + airline.base + ' or outstations',
  ];
}

function makeJobs() {
  const jobs = [];
  const today = '2026-07-30';

  globalAirlines.forEach((a, idx) => {
    const idBase = `gl-${a.code.toLowerCase()}-${idx}`;

    // Cabin crew for every airline
    jobs.push({
      id: `${idBase}-cc`,
      title: `Cabin Crew — ${a.name}`,
      company: a.name,
      location: a.base,
      type: 'Full-time',
      category: 'Cabin Crew',
      department: 'In-Flight Services',
      level: 'Fresher',
      region: a.region,
      country: a.country,
      salary: 'As per airline scale + allowances',
      source: 'Company',
      postedAt: today,
      applyUrl: a.careers,
      description: `Cabin crew opportunities with ${a.name} (${a.code}). Deliver safety and service on ${a.region} network from ${a.base}. Freshers and experienced cabin crew may apply when drives are open — training after selection.`,
      eligibility: cabinEligibility(a),
      tags: [a.name, a.code, 'Cabin Crew', a.region, a.country],
    });

    // Customer experience — every 2nd airline + all major ME/US/UK/AU
    const isMajor =
      /Emirates|Qatar|Etihad|American|Delta|United|British|easyJet|Ryanair|Qantas|Virgin|Southwest|JetBlue|Lufthansa|Singapore|Cathay/i.test(
        a.name
      );
    if (isMajor || idx % 2 === 0) {
      jobs.push({
        id: `${idBase}-cx`,
        title: `Customer Experience / Guest Services — ${a.name}`,
        company: a.name,
        location: a.base,
        type: 'Full-time',
        category: 'Customer Experience',
        department: 'Customer Experience',
        level: idx % 3 === 0 ? 'Junior' : 'Fresher',
        region: a.region,
        country: a.country,
        salary: 'Competitive — market rate for base city',
        source: 'Company',
        postedAt: today,
        applyUrl: a.careers,
        description: `Customer Experience department at ${a.name}: passenger care at airport touchpoints, service recovery, special assistance and brand experience. Suitable for hospitality and service graduates.`,
        eligibility: cxEligibility(a),
        tags: [a.name, 'Customer Experience', a.region, a.country],
      });
    }

    // Ground operations — every 3rd + majors
    if (isMajor || idx % 3 === 0) {
      jobs.push({
        id: `${idBase}-go`,
        title: `Ground Operations / Airport Services — ${a.name}`,
        company: a.name,
        location: a.base,
        type: 'Full-time',
        category: 'Ground Operations',
        department: 'Ground Operations',
        level: 'Fresher',
        region: a.region,
        country: a.country,
        salary: 'As per station package',
        source: 'Company',
        postedAt: today,
        applyUrl: a.careers,
        description: `Airport ground operations with ${a.name}: check-in support, boarding coordination, ramp liaison and station services. Entry-level and experienced ground staff welcome when roles are advertised.`,
        eligibility: groundEligibility(a),
        tags: [a.name, 'Ground Operations', a.region, a.country],
      });
    }
  });

  return jobs;
}

const internationalJobs = makeJobs();

export { globalAirlines };
export default internationalJobs;
