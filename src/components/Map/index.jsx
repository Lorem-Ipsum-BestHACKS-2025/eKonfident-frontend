import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import styles from "./index.module.css";

/**
 * Dokumentacja komponentu Map
 * * @param {object} props - Właściwości komponentu.
 * @param {Array<number>} props.coordinates - Współrzędne [szerokość, długość] do wyśrodkowania mapy.
 * * @returns {JSX.Element} Komponent mapy Leaflet.
 */
const Map = ({ coordinates }) => {
  // Sprawdzenie, czy współrzędne są poprawne. Jeśli nie, używamy domyślnych.
  const position =
    Array.isArray(coordinates) && coordinates.length === 2
      ? coordinates
      : [51.505, -0.09];

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Dokładna lokalizacja zdarzenia.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
