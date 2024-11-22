import { NextResponse } from 'next/server';
import { fetchYCJobs } from '@/lib/jobs/yc';
import { SAMPLE_JOBS } from '@/lib/jobs';

// In-memory cache
let jobsCache: any[] = [];
let lastFetch: number = 0;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export async function GET(request: Request) {
  try {
    // Check cache freshness
    const now = Date.now();
    if (now - lastFetch > CACHE_DURATION || jobsCache.length === 0) {
      console.log('Cache expired or empty, fetching fresh data...');
      
      const { jobs: ycJobs, source } = await fetchYCJobs();
      console.log(`Fetched ${ycJobs.length} jobs from source: ${source}`);
      
      // Use sample jobs as fallback if no YC jobs found
      jobsCache = ycJobs.length > 0 ? ycJobs : SAMPLE_JOBS;
      lastFetch = now;
      
      console.log(`Cache updated with ${jobsCache.length} total jobs`);
    } else {
      console.log('Using cached jobs data');
    }

    // Parse and apply filters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase();
    const location = searchParams.get('location');
    const jobType = searchParams.get('jobType');
    const experienceLevel = searchParams.get('experienceLevel');

    let filteredJobs = jobsCache;

    // Apply filters and log results
    if (search) {
      console.log(`Filtering by search term: ${search}`);
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search) ||
        job.description.toLowerCase().includes(search)
      );
    }

    if (location) {
      console.log(`Filtering by location: ${location}`);
      filteredJobs = filteredJobs.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (jobType) {
      console.log(`Filtering by job type: ${jobType}`);
      filteredJobs = filteredJobs.filter(job =>
        job.type.toLowerCase() === jobType.toLowerCase()
      );
    }

    if (experienceLevel) {
      console.log(`Filtering by experience level: ${experienceLevel}`);
      filteredJobs = filteredJobs.filter(job =>
        job.experienceLevel.toLowerCase() === experienceLevel.toLowerCase()
      );
    }

    console.log(`Returning ${filteredJobs.length} jobs after filtering`);

    return NextResponse.json({
      jobs: filteredJobs,
      total: filteredJobs.length,
      timestamp: new Date().toISOString(),
      source: jobsCache === SAMPLE_JOBS ? 'sample' : 'yc',
    });
  } catch (error) {
    console.error('Error in jobs API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch jobs',
        details: error instanceof Error ? error.message : 'Unknown error',
        fallback: 'Returning sample jobs as fallback'
      },
      { status: 500 }
    );
  }
}