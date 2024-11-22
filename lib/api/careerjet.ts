"use client";

import { Job } from '@/lib/types';

const CACHE_KEY = 'aijobhub_jobs_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

interface CareerjetJob {
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  salary?: string;
  date: string;
}

async function fetchCareerjetJobs(query: string = 'AI Software Engineer'): Promise<Job[]> {
  try {
    // In production, this would be a real API call
    // For now, we'll enhance our sample data with more realistic fields
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_KEY + '_time');

    if (cachedData && cachedTime && Date.now() - Number(cachedTime) < CACHE_DURATION) {
      return JSON.parse(cachedData);
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Use our enhanced sample data
    const jobs = SAMPLE_JOBS.map(job => ({
      ...job,
      source: 'careerjet',
      query_matched: query.toLowerCase().split(' ').some(term => 
        job.title.toLowerCase().includes(term) || 
        job.description.toLowerCase().includes(term)
      ),
    }));

    localStorage.setItem(CACHE_KEY, JSON.stringify(jobs));
    localStorage.setItem(CACHE_KEY + '_time', Date.now().toString());

    return jobs;
  } catch (error) {
    console.error('Error fetching Careerjet jobs:', error);
    throw new Error('Failed to fetch jobs');
  }
}

export async function searchJobs(params: {
  query?: string;
  location?: string;
  page?: number;
}): Promise<{ jobs: Job[]; total: number }> {
  try {
    const jobs = await fetchCareerjetJobs(params.query);
    
    let filteredJobs = jobs;

    // Apply location filter if provided
    if (params.location) {
      const locationLower = params.location.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(locationLower)
      );
    }

    return {
      jobs: filteredJobs,
      total: filteredJobs.length
    };
  } catch (error) {
    console.error('Error searching jobs:', error);
    return { jobs: [], total: 0 };
  }
}