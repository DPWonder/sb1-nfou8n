"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchSkillSuggestions } from '@/lib/api';
import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

export function useSkillSuggestions() {
  const [search, setSearch] = useState('');

  const debouncedFetch = useCallback(
    debounce((query: string) => {
      if (query.length >= 2) {
        setSearch(query);
      }
    }, 300),
    []
  );

  const { data: suggestions, isLoading } = useQuery({
    queryKey: ['skillSuggestions', search],
    queryFn: () => fetchSkillSuggestions(search),
    enabled: search.length >= 2,
  });

  return {
    suggestions: suggestions ?? [],
    isLoading,
    onSearch: debouncedFetch,
  };
}