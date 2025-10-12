import { MdOutlineReadMore } from "react-icons/md";
import { Link } from "react-router-dom";

import IncidentRecord from "../IncidentRecord";
import style from "./index.module.css";

export default function RecentIncidents({
  className,
  incidents = [],
  loading = false,
}) {
  const displayIncidents = incidents.slice(0, 6);

  if (loading) {
    return (
      <section className={`${style.tile} ${className}`}>
        <section className={style.top}>
          <header>Najnowsze zdarzenia</header>
          <div>Ładowanie...</div>
        </section>
      </section>
    );
  }

  return (
    <section className={`${style.tile} ${className}`}>
      <section className={style.top}>
        <header>Najnowsze zdarzenia</header>
        {displayIncidents.length > 0 ? (
          displayIncidents.map((incident) => (
            <IncidentRecord
              key={incident.id}
              className={style.incident}
              id={incident.id}
              title={incident.title}
              address={`${incident.street}, ${incident.city}`}
              description={incident.note || "Brak dodatkowych informacji"}
              name={`${incident.firstName} ${incident.lastName}`}
              username={incident.nickname || "Anonim"}
              date={new Date(incident.createdAt).toLocaleString("pl-PL")}
              upvotes={incident.upvotes || 0}
              downvotes={incident.downvotes || 0}
            />
          ))
        ) : (
          <div>Brak najnowszych zdarzeń</div>
        )}
      </section>
    </section>
  );
}
