import L from "leaflet";
import React, { useMemo, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

import style from "./index.module.css";

// Fix for default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Component to handle map clicks and marker placement
function LocationMarker({ onLocationPick }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      // Set the marker position to the clicked coordinates
      const newPosition = e.latlng;
      setPosition(newPosition);
      // Pass the coordinates up to the parent form
      onLocationPick(newPosition);
    },
  });

  return position === null ? (
    <div className="map-overlay">
      <div className="map-button">📍 Wybierz lokalizację na mapie</div>
    </div>
  ) : (
    // Only show the marker once a location is picked
    <Marker position={position} key={position.lat} />
  );
}

// Main MapPicker component
export default function MapPicker({
  onLocationPick,
  defaultCenter = [51.9189046, 19.1343786],
  defaultZoom = 7,
  className = "",
}) {
  // Memoize the map components as MapContainer is immutable after first render
  const mapElement = useMemo(
    () => (
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={false}
        className={className}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onLocationPick={onLocationPick} />
      </MapContainer>
    ),
    [onLocationPick, defaultCenter, defaultZoom, className],
  );

  return (
    <div className={style.formGroup}>
      <label className={style.formLabel}>Lokalizacja</label>
      <div style={{ position: "relative" }}>{mapElement}</div>
    </div>
  );
}
