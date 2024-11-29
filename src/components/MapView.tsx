import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon, LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { SearchResult } from '../types'

const defaultIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [41, 41]
})

const selectedIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [41, 41]
})

interface MapViewProps {
  results: SearchResult[]
  selectedLocation?: SearchResult | null
  onMarkerClick?: (result: SearchResult) => void
  defaultLatitude?: number
  defaultLongitude?: number
  zoom?: number
}

function ChangeView({ center, zoom }: { center: LatLngExpression, zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export function MapView({ 
  results,
  selectedLocation,
  onMarkerClick,
  defaultLatitude = 43.6224,
  defaultLongitude = -79.6808,
  zoom = 2
}: MapViewProps) {
  const center: LatLngExpression = results.length > 0
    ? [results[0].latitude, results[0].longitude]
    : [defaultLatitude, defaultLongitude]

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="h-[600px] rounded-lg overflow-hidden">
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ width: '100%', height: '100%' }}
          scrollWheelZoom={false}
        >
          <ChangeView center={center} zoom={zoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Render markers for all search results */}
          {results.map((result, index) => (
            <Marker 
              key={`${result.latitude}-${result.longitude}-${index}`}
              position={[result.latitude, result.longitude]}
              eventHandlers={{
                click: () => onMarkerClick?.(result)
              }}
              icon={result === selectedLocation ? selectedIcon : defaultIcon}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold">{result.street}</div>
                  <div>{result.city}, {result.zipCode}</div>
                  <div className="text-gray-500 mt-1">
                    {result.latitude.toFixed(4)}, {result.longitude.toFixed(4)}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

