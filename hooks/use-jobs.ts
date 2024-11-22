"use client";

import useSWR from 'swr';
import { Job, JobFilters } from '@/lib/types';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useJobs(filters: Partial<JobFilters>) {
  // Create a stable key for SWR that includes all filter parameters
  const filterKey = JSON.stringify(filters);
  
  const { data, error, isLoading, mutate } = useSWR(
    `/api/jobs?${new URLSearchParams({
      ...filters as Record<string, string>,
      _cache: filterKey // Add cache key to prevent stale data
    })}`,
    fetcher,
    {
      revalidateOnFocus: false, // Prevent revalidation on window focus
      dedupingInterval: 5000, // Dedupe requests within 5 seconds
      keepPreviousData: true, // Keep showing previous data while loading
    }
  );

  return {
    jobs: data?.jobs as Job[],
    isLoading,
    isError: error,
    totalJobs: data?.total || 0,
    mutate, // Expose mutate function to manually refresh data
  };
}