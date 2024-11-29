import { MapPin } from 'lucide-react'
import { SearchResult } from '../types'

interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
  onResultClick?: (result: SearchResult) => void;
}

export function SearchResults({ results, loading, onResultClick }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm text-center text-gray-500">
        No results found
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <div 
          key={index} 
          className="bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => onResultClick?.(result)}
        >
          <div className="space-y-4">
            {/* Main Info */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{result.street}</h3>
                <p className="text-sm text-gray-500">
                  {result.city}, {result.zip_code}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">
                  {(result.score * 100).toFixed(0)}% match
                </div>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${result.score * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Location Details */}
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
                <span className="text-gray-500">
                  {result.county}, {result.country}
                </span>
              </div>
              <div className="flex items-center gap-2 pl-6">
                <span className="text-gray-500">
                  Coordinates: {result.latitude}, {result.longitude}
                </span>
              </div>
              <div className="flex items-center gap-2 pl-6">
                <span className="text-gray-500">
                  Timezone: {result.time_zone}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}