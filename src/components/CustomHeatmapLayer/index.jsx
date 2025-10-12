import L from "leaflet";
import "leaflet.heat";
import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

function createHeatLayer(data, props) {
  if (!Array.isArray(data) || data.length === 0) {
    return L.layerGroup(); // Return empty layer group if no data
  }

  const points = data
    .filter(
      (item) =>
        item &&
        typeof item.latitude === "number" &&
        typeof item.longitude === "number",
    )
    .map((item) => [item.latitude, item.longitude, item.intensity || 1]);

  if (points.length === 0) {
    return L.layerGroup(); // Return empty layer group if no valid points
  }

  return L.heatLayer(points, {
    radius: props.radius || 25,
    blur: props.blur || 15,
    maxOpacity: props.maxOpacity || 0.5,
    minOpacity: props.minOpacity || 0.05,
  });
}

export default function CustomHeatmapLayer({
  data,
  radius,
  blur,
  maxOpacity,
  minOpacity,
}) {
  const map = useMap();

  useEffect(() => {
    try {
      const heatLayer = createHeatLayer(data, {
        radius,
        blur,
        maxOpacity,
        minOpacity,
      });

      heatLayer.addTo(map);

      return () => {
        try {
          map.removeLayer(heatLayer);
        } catch (error) {
          console.warn("Error removing heat layer:", error);
        }
      };
    } catch (error) {
      console.error("Error creating heat layer:", error);
    }
  }, [map, data, radius, blur, maxOpacity, minOpacity]);

  return null;
}
