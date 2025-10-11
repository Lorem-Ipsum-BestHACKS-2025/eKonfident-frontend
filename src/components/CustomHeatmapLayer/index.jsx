import L from "leaflet";
import "leaflet.heat";
import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

function createHeatLayer(data, props) {
  const points = data.map((item) => [
    item.latitude,
    item.longitude,
    item.intensity || 1,
  ]);

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
    const heatLayer = createHeatLayer(data, {
      radius,
      blur,
      maxOpacity,
      minOpacity,
    });

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, data, radius, blur, maxOpacity, minOpacity]);

  return null;
}
