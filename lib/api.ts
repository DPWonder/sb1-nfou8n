import { Job, JobFilters, ApiResponse } from '@/lib/types';
import { SAMPLE_JOBS } from './jobs';
import { JOB_LISTING_DURATION, DEFAULT_PAGE_SIZE } from './constants';
import { subDays } from 'date-fns';

// Helper function to check if a job is expired
function isJobExpired(job: Job): boolean {
  const expirationDate = new Date(job.postedAt);
  expirationDate.setDate(expirationDate.getDate() + JOB_LISTING_DURATION);
  return new Date() > expirationDate;
}

export async function fetchJobs(
  filters: Partial<JobFilters>,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE
): Promise<ApiResponse<Job[]>> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Filter out expired jobs first
  let filteredJobs = SAMPLE_JOBS.filter(job => !isJobExpired(job));

  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply job type filter
  if (filters.jobType?.length) {
    filteredJobs = filteredJobs.filter(job => 
      filters.jobType!.includes(job.type)
    );
  }

  // Apply location filter
  if (filters.location) {
    filteredJobs = filteredJobs.filter(job => 
      job.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }

  // Apply salary range filter
  if (filters.salaryRange) {
    filteredJobs = filteredJobs.filter(job => 
      job.salary.min >= filters.salaryRange[0] &&
      job.salary.max <= filters.salaryRange[1]
    );
  }

  // Apply skills filter
  if (filters.skills?.length) {
    filteredJobs = filteredJobs.filter(job => 
      filters.skills!.every(skill => 
        job.skills.some(jobSkill => 
          jobSkill.toLowerCase().includes(skill.toLowerCase())
        )
      )
    );
  }

  // Apply experience level filter
  if (filters.experienceLevel?.length) {
    filteredJobs = filteredJobs.filter(job =>
      filters.experienceLevel!.includes(job.experienceLevel)
    );
  }

  // Calculate pagination
  const total = filteredJobs.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedJobs = filteredJobs.slice(start, end);

  return {
    data: paginatedJobs,
    meta: {
      total,
      page,
      pageSize,
      hasMore: end < total
    }
  };
}

export async function reportJob(jobId: string, reason: string): Promise<void> {
  // In a real implementation, this would send the report to your backend
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Job ${jobId} reported: ${reason}`);
}

// This function would be used when integrating with real job board APIs
export async function fetchExternalJobs(filters: Partial<JobFilters>): Promise<Job[]> {
  // This is where you would integrate with external APIs like Indeed, LinkedIn, etc.
  // Example implementation with Indeed API:
  /*
  const response = await fetch(`${INDEED_API_URL}/jobs/search`, {
    headers: {
      'Authorization': `Bearer ${process.env.INDEED_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: filters.search,
      l: filters.location,
      salary: filters.salaryRange,
      jt: filters.jobType,
      // ... other parameters
    }),
  });

  const data = await response.json();
  return data.results.map(transformIndeedJob);
  */

  // For now, return sample data
  return SAMPLE_JOBS;
}

// Helper function to transform Indeed job data to our format
function transformIndeedJob(indeedJob: any): Job {
  return {
    id: indeedJob.id,
    title: indeedJob.title,
    company: indeedJob.company,
    location: indeedJob.location,
    salary: {
      min: indeedJob.salary_min || 0,
      max: indeedJob.salary_max || 0,
      currency: indeedJob.salary_currency || 'USD'
    },
    type: indeedJob.type,
    description: indeedJob.description,
    requirements: indeedJob.requirements || [],
    skills: indeedJob.skills || [],
    experienceLevel: indeedJob.experience_level || 'not_specified',
    postedAt: indeedJob.posted_at,
    applicationUrl: indeedJob.url,
    views: 0
  };
}