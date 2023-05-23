import { getJobs } from './db/jobs.js';
import { getCompany } from './db/companies.js';

export const resolvers = {
  Query: {
    jobs: async () => await getJobs()
  },
  Job: {
    date: async (job) => toISOString(job.createdAt),
    company: (job) => getCompany(job.companyId)
  },
};

const toISOString = (value) => {
  return value.slice(0, 'yyyy-mm-dd'.length)
}