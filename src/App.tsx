import { useState } from 'react'
import { SearchBar } from './components/SearchBar'
import { SearchResults } from './components/SearchResults'
import { MapView } from './components/MapView'
import { useLocationSearch } from './hooks/useLocationSearch'
import { SearchResult } from './types'

export default function App() {
  const { results, loading, error, search } = useLocationSearch()
  const [selectedLocation, setSelectedLocation] = useState<SearchResult | null>(null)

  const handleSearch = async (query: string, location: { latitude: number; longitude: number }) => {
    await search({
      q: query,
      latitude: location.latitude,
      longitude: location.longitude
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-2">Location Search</h1>
        <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
          <div className="space-y-6">
            <SearchBar onSearch={handleSearch} />
            <SearchResults 
              results={results}
              loading={loading}
              onResultClick={setSelectedLocation}
            />
          </div>
          <div>
            <MapView 
              results={results}
              selectedLocation={selectedLocation}
              onMarkerClick={setSelectedLocation}
              defaultLatitude={43.6224}
              defaultLongitude={-79.6808}
            />
          </div>
        </div>
        {error && (
          <div className="mt-4 text-sm text-red-500 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}