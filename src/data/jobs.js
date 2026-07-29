/**
 * All Runway2Sky vacancies: India core + 100+ global airlines (ME, US, UK, Australia…).
 */
import indiaJobs from './jobsIndiaCore';
import internationalJobs from './internationalJobs';
import globalAirlines from './globalAirlines';

const indiaNormalized = indiaJobs.map((j) => ({
  ...j,
  region: j.region || 'India',
  country: j.country || 'India',
}));

const jobs = [...indiaNormalized, ...internationalJobs];

export const jobCategories = [
  'All',
  'Cabin Crew',
  'Customer Experience',
  'Ground Handling',
  'Ground Operations',
  'Engineering & MRO',
  'Commercial',
  'Security',
  'Graduate / Trainee',
];

export const jobRegions = [
  'All',
  'India',
  'Middle East',
  'USA',
  'UK',
  'Australia',
  'Europe',
  'Asia',
  'Americas',
  'Africa',
];

export const jobLevels = ['All', 'Fresher', 'Junior', 'Mid', 'Senior'];
export const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract'];
export const jobSources = ['All', 'Company', 'LinkedIn', 'Indeed', 'Naukri', 'Direct', 'Adzuna', 'Google Jobs'];

export { globalAirlines };
export default jobs;
