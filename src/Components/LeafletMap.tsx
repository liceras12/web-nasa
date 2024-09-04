import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface LeafletMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  width?: string;
  height?: string;
  name?: string;
  category?: string;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  latitude,
  longitude,
  zoom = 5,
  width = "600px",
  height = "450px",
  name,
  category,
}) => {
  // Asegúrate de que center es del tipo [number, number]
  const center: [number, number] = [latitude, longitude];

  return (
    <div style={{ width, height }}>
      {/* Usa el tipo correcto para el centro del mapa */}
      <MapContainer center={center} zoom={zoom} style={{ width: "100%", height: "100%", border:" 2px solid black" }}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center}>
          <Popup>
            {category} <br /> {name}.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
