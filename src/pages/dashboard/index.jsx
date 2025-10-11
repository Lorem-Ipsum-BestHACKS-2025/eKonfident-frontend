import "leaflet/dist/leaflet.css";
import { MdLink } from "react-icons/md";
import { MapContainer, TileLayer } from "react-leaflet";

import AiForecast from "../../components/AiForecast";
import Button from "../../components/Button";
import CustomHeatmapLayer from "../../components/CustomHeatmapLayer";
import RecentIncidents from "../../components/RecentIncidents";
import style from "./index.module.css";

const CENTER_LAT = 52.22977;
const CENTER_LNG = 21.01178;
const NUM_POINTS = 50;

const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

// placeholder for real data
const generateHeatmapData = () => {
  const data = [];

  for (let i = 0; i < NUM_POINTS; i++) {
    const latOffset = getRandomFloat(-0.05, 0.05);
    const lngOffset = getRandomFloat(-0.08, 0.08);

    const latitude = CENTER_LAT + latOffset;
    const longitude = CENTER_LNG + lngOffset;

    const intensity = 1;

    data.push({
      latitude,
      longitude,
      intensity,
    });
  }

  return data;
};

const heatmapData = generateHeatmapData();

export default function Dashboard() {
  const center = [51.9189046, 19.1343786];
  const zoom = 6;

  return (
    <section className={style.page}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className={style.heatMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CustomHeatmapLayer data={heatmapData} radius={20} blur={-3} />
      </MapContainer>
      <AiForecast className={style.ai} />
      <section className={style.side}>
        <span>Przejdź na ciemną stronę mocy... Bądź sztywnym gitem</span>
        <Button>
          <MdLink size={"3rem"} /> Zobacz nieKonfident
        </Button>
      </section>
      <RecentIncidents
        className={style.incidents}
        incidents={["a", "a", "a", "a", "a", "a"]}
      />
    </section>
  );
}
