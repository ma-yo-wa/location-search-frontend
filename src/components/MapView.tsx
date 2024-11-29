import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const icon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [41, 41]
})

interface MapViewProps {
  latitude?: number
  longitude?: number
  zoom?: number
}

export function MapView({ 
  latitude = 43.6224, 
  longitude = -79.6808, 
  zoom = 13 
}: MapViewProps) {
  console.log(latitude, longitude)
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="h-[600px] rounded-lg overflow-hidden">
        <MapContainer
          center={[latitude, longitude]}
          zoom={zoom}
          style={{ width: '100%', height: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]} icon={icon}>
            <Popup>
              Selected Location<br />
              {latitude.toFixed(4)}, {longitude.toFixed(4)}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

