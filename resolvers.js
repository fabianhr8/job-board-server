import { GraphQLError } from 'graphql';
import {
  createJob,
  getJob,
  getJobsByCompany,
  getJobs,
  updateJob,
  deleteJob
} from './db/jobs.js';
import { getCompany } from './db/companies.js';

export const resolvers = {
  Query: {
    company: async (_root, { id }) => {
      const company = await getCompany(id)
      if (!company) throw notFoundError('No company found with ID ' + id)
      return company
    },
    job: async (_root, { id }) => {
      const job = await getJob(id)
      if (!job) throw notFoundError('No job found with ID ' + id)
      return job
    },
    jobs: async () => await getJobs()
  },
  Mutation: {
    createJob: (_root, { input: { title, description} }, { auth }) => {
      if (!auth) throw unauthorizedError('Missing authentication')
      const companyId = 'FjcJCHJALA4i' // TODO: change to dynamic
      return createJob({ companyId, title, description});
    },
    updateJob: (_root, { input: { id, title, description} }) => {
      return updateJob({ id, title, description});
    },
    deleteJob: (_root, { id }) => deleteJob(id),
  },
  Company: {
    jobs: (company) => getJobsByCompany(company.id)
  },
  Job: {
    company: (job) => getCompany(job.companyId),
    date: async (job) => toISOString(job.createdAt)
  },
};

const notFoundError = (message) => {
  return new GraphQLError(
    message,
    {
      extensions: { code: 'NOT_FOUND' }
    }
  )
}

const unauthorizedError = (message) => {
  return new GraphQLError(
    message,
    {
      extensions: { code: 'UNAUTHORIZED ' }
    }
  )
}

const toISOString = (value) => {
  return value.slice(0, 'yyyy-mm-dd'.length)
}