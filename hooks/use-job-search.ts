"use client";

import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { searchJobs } from '@/lib/api/careerjet';
import { Job } from '@/lib/types';
import { useDebounce } from '@/hooks/use-debounce';

export function useJobSearch() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const searchWithDebounce = useDebounce(async (query?: string, location?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await searchJobs({ query, location });
      setJobs(result.jobs);

      if (result.jobs.length === 0) {
        toast({
          title: "No jobs found",
          description: "Try adjusting your search criteria",
        });
      }
    } catch (err) {
      setError('Failed to fetch jobs');
      toast({
        title: "Error",
        description: "Failed to fetch jobs. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, 500);

  const search = useCallback((query?: string, location?: string) => {
    searchWithDebounce(query, location);
  }, [searchWithDebounce]);

  return {
    jobs,
    isLoading,
    error,
    search
  };
}