// hooks/useLocationSearch.ts
import { useState } from 'react';
import { SearchResult } from '../types';

interface SearchParams {
  q?: string;
  latitude?: number;
  longitude?: number;
  page?: number;
  limit?: number;
}

interface SearchResponse {
  success: boolean;
  results: SearchResult[];
  error?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export function useLocationSearch() {
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState<number | undefined>(undefined);
  const [currentLongitude, setCurrentLongitude] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async ({ q, latitude, longitude, page = 1, limit = 10 }: SearchParams) => {
    setLoading(true);
    setError(null);

    try {
      if (latitude !== undefined) {
        setCurrentLatitude(latitude);
      }
      if (longitude !== undefined) {
        setCurrentLongitude(longitude);
      }
      setCurrentQuery(q ?? currentQuery);

      const params = new URLSearchParams();
      if (q) params.append('q', q);
      if (currentLatitude !== undefined) {
        params.append('latitude', currentLatitude.toString());
      }
      if (currentLongitude !== undefined) {
        params.append('longitude', currentLongitude.toString());
      }
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/search?${params}`);

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data: SearchResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Search failed');
      }

      setResults(data.results);
      setCurrentPage(data.meta?.page || 1);
      setTotalPages(Math.ceil((data.meta?.total || 0) / limit));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      search({
        q: currentQuery,
        latitude: currentLatitude,
        longitude: currentLongitude,
        page: currentPage + 1,
      });
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      search({
        q: currentQuery,
        latitude: currentLatitude,
        longitude: currentLongitude,
        page: currentPage - 1,
      });
    }
  };

  const updateQuery = (query: string) => {
    setCurrentQuery(query);
  };

  return {
    results,
    loading,
    error,
    search,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    updateQuery,
  };
}