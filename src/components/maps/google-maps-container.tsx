'use client'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const location = {
  address: 'Av. dos Sabiás, 330 - Morada de Laranjeiras, Serra - ES, 29166-630',
  lat: -20.1975562,
  lng: -40.2196875,
}
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!

export function GoogleMapsContainer() {
  return (
    <APIProvider apiKey={API_KEY}>
      <Map style={containerStyle} defaultCenter={location} zoom={15}>
        <Marker position={location} />
      </Map>
    </APIProvider>
  )
}
