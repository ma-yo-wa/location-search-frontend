// hooks/useLocationSearch.ts
import { useState } from 'react';
import { SearchResult } from '../types';

interface SearchParams {
  q?: string;
  latitude?: number;
  longitude?: number;
}

interface SearchResponse {
  success: boolean;
  results: SearchResult[];
  error?: string;
}

export function useLocationSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async ({ q, latitude, longitude }: SearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (q) params.append('q', q);
      if (latitude) params.append('latitude', latitude.toString());
      if (longitude) params.append('longitude', longitude.toString());

      const response = await fetch(
        `https://location-search-backend.onrender.com/search?${params}`
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data: SearchResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Search failed');
      }

      setResults(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    search
  };
}