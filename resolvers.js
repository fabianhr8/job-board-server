import { getJob, getJobsByCompany, getJobs } from './db/jobs.js';
import { getCompany } from './db/companies.js';

export const resolvers = {
  Query: {
    company: (_root, { id }) => getCompany(id),
    job: (_root, { id }) => getJob(id),
    jobs: async () => await getJobs()
  },
  Company: {
    jobs: (company) => getJobsByCompany(company.id)
  },
  Job: {
    company: (job) => getCompany(job.companyId),
    date: async (job) => toISOString(job.createdAt)
  },
};

const toISOString = (value) => {
  return value.slice(0, 'yyyy-mm-dd'.length)
}