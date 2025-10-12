import { useEffect, useState } from "react";
import { FaBrain } from "react-icons/fa";

import { api } from "../../utils/api";
import style from "./index.module.css";

export default function AiForecast({ className = "" }) {
  const [aiSummary, setAiSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAiSummary = async () => {
      try {
        const summary = await api.ai.getSummary(true); // Get summary for konfident reports
        setAiSummary(summary);
      } catch (error) {
        console.error("Failed to fetch AI summary:", error);
        setAiSummary({
          summary: "Nie można było pobrać analizy AI. Sprawdź połączenie.",
          totalReports: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAiSummary();
  }, []);

  return (
    <div className={`${style.tile} ${className}`}>
      <div>
        <FaBrain size={"4rem"} />
      </div>
      <div>
        <header>AI Overview</header>
        {loading ? (
          <div>Generowanie analizy AI...</div>
        ) : (
          <div>
            {aiSummary?.summary || "Brak dostępnej analizy"}
            {aiSummary?.totalReports && (
              <div
                style={{ marginTop: "10px", fontSize: "0.9em", opacity: 0.8 }}
              >
                Przeanalizowano {aiSummary.totalReports} zgłoszeń
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
