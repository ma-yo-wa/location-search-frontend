import { useState } from 'react'
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string, location: { latitude: number; longitude: number }) => Promise<void>;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState<{ latitude: number; longitude: number }>({ latitude: 0, longitude: 0 })
  const [isLocating, setIsLocating] = useState(false)
  const [showCoordinates, setShowCoordinates] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({})

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateInputs()) {
      await onSearch(query, location)
    }
  }

  const getCurrentLocation = () => {
    console.log('hjhjhj')
    setIsLocating(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position, 'jkjkj')
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          setIsLocating(false)
          setShowCoordinates(true)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLocating(false)
        }
      )
    } else {
      console.error("Geolocation is not supported")
      setIsLocating(false)
    }
  }

  const validateInputs = (): boolean => {
    const newErrors: typeof errors = {};
    const hasSearchQuery = query.trim().length > 0;
    const hasLatitude = location.latitude !== 0;
    const hasLongitude = location.longitude !== 0;

   
    if (!hasSearchQuery && !hasLatitude && !hasLongitude) {
      newErrors.query = "Please enter a search term or coordinates";
      return false;
    }

    if (hasLatitude !== hasLongitude) {
      if (!hasLongitude) {
        newErrors.longitude = "Longitude is required when Latitude is provided";
      } else {
        newErrors.latitude = "Latitude is required when Longitude is provided";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCoordinateChange = (type: 'latitude' | 'longitude', value: string) => {
    setErrors(prev => ({ ...prev, [type]: undefined }));
    
    if (value === '') {
      setLocation(prev => ({
        ...prev,
        [type]: 0
      }));
      return;
    }

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const isValid = type === 'latitude' 
        ? numValue >= -90 && numValue <= 90
        : numValue >= -180 && numValue <= 180;

      if (isValid) {
        setLocation(prev => ({
          ...prev,
          [type]: numValue
        }));
      }
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.query;
      return newErrors;
    });
    setQuery(e.target.value);
    
    // If user starts typing a search query, clear coordinates
    if (e.target.value.trim().length >= 2) {
      setLocation({ latitude: 0, longitude: 0 });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search locations..."
              value={query}
              onChange={handleQueryChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.query ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.query && (
              <p className="text-sm text-red-500 mt-1">{errors.query}</p>
            )}
          </div>
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={isLocating}
            className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-50"
            title="Use current location"
          >
            {isLocating ? (
              <span className="animate-spin">↻</span>
            ) : (
              <MapPin className="w-5 h-5" />
            )}
          </button>
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowCoordinates(!showCoordinates)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
          >
            {showCoordinates ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            {showCoordinates ? "Hide coordinates" : "Enter coordinates manually"}
          </button>

          {showCoordinates && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="latitude" className="block text-sm text-gray-500 mb-1">
                  Latitude
                </label>
                <input
                  id="latitude"
                  type="number"
                  placeholder="-90 to 90"
                  value={location.latitude === 0 ? '' : location.latitude} 
                  step="any"
                  onChange={(e) => handleCoordinateChange('latitude', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.latitude ? 'border-red-500' : 'border-gray-200'
                  }`}
                  min="-90"
                  max="90"
                />
                {errors.latitude && (
                  <p className="text-sm text-red-500 mt-1">{errors.latitude}</p>
                )}
              </div>
              <div>
                <label htmlFor="longitude" className="block text-sm text-gray-500 mb-1">
                  Longitude
                </label>
                <input
                  id="longitude"
                  type="number"
                  step="any"
                  value={location.longitude === 0 ? '' : location.longitude} 
                  placeholder="-180 to 180"
                  onChange={(e) => handleCoordinateChange('longitude', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.longitude ? 'border-red-500' : 'border-gray-200'
                  }`}
                  min="-180"
                  max="180"
                />
                {errors.longitude && (
                  <p className="text-sm text-red-500 mt-1">{errors.longitude}</p>
                )}
              </div>
            </div>
          )}

          {showCoordinates && location && (
            <p className="text-sm text-gray-500 mt-4">
              Current coordinates: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

