import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MdLink } from "react-icons/md";
import { MapContainer, TileLayer } from "react-leaflet";

import AiForecast from "../../components/AiForecast";
import Button from "../../components/Button";
import CustomHeatmapLayer from "../../components/CustomHeatmapLayer";
import RecentIncidents from "../../components/RecentIncidents";
import { api } from "../../utils/api";
import style from "./index.module.css";

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(true);

  const center = [52.0, 19.0]; // Center of Poland
  const zoom = 7; // Better zoom level to show all major Polish cities

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        console.log("Fetching reports...");
        const reportsData = await api.reports.getAll();
        console.log("Reports fetched:", reportsData?.length || 0);

        if (!Array.isArray(reportsData)) {
          console.error("Invalid data format:", reportsData);
          return;
        }

        // Sort reports by creation date (most recent first) for the recent incidents sidebar
        const sortedReports = [...reportsData].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setReports(sortedReports);

        // Convert reports to heatmap data - sample evenly across all cities
        const citiesData = {};
        reportsData.forEach((report) => {
          if (!citiesData[report.city]) {
            citiesData[report.city] = [];
          }
          citiesData[report.city].push(report);
        });

        // Take up to 150 reports from each city for better geographic distribution
        const sampledReports = [];
        Object.values(citiesData).forEach((cityReports) => {
          sampledReports.push(...cityReports.slice(0, 150));
        });

        console.log(
          "Sampled reports by city:",
          Object.keys(citiesData).map(
            (city) => `${city}: ${Math.min(150, citiesData[city].length)}`,
          ),
        );

        const heatmapData = sampledReports
          .map((report) => ({
            latitude: parseFloat(report.latitude),
            longitude: parseFloat(report.longitude),
            intensity: Math.max(0.1, (report.upvotes - report.downvotes) / 10),
          }))
          .filter((point) => !isNaN(point.latitude) && !isNaN(point.longitude));

        console.log("Heatmap data points:", heatmapData.length);
        setHeatmapData(heatmapData);
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

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
        <span>
          Przejdź na ciemną stronę mocy... Zostań <b>sztywnym gitem</b>
        </span>
        <Button>
          <MdLink size={"3rem"} /> Zobacz nieKonfident
        </Button>
      </section>
      <RecentIncidents
        className={style.incidents}
        incidents={Array.isArray(reports) ? reports.slice(0, 6) : []}
        loading={loading}
      />
    </section>
  );
}
