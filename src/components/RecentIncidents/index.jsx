import { MdOutlineReadMore } from "react-icons/md";
import { Link } from "react-router-dom";

import IncidentRecord from "../IncidentRecord";
import style from "./index.module.css";

export default function RecentIncidents({ className, incidents }) {
  incidents = incidents.slice(0, 3);
  return (
    <section className={`${style.tile} ${className}`}>
      <section className={style.top}>
        <header>Najnowsze zdarzenia</header>
        {incidents.map(() => (
          <IncidentRecord
            className={style.incident}
            id={1}
            title="Rabunek"
            address="Urzędowa 3, 00-00 Białystok"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sequi
                      dolores quasi eius architecto dolore molestias excepturi quas, modi
                      ipsum quisquam, suscipit tempore libero aliquid porro, obcaecati
                      beatae? Iste, officiis?"
            name="Lech Wałęsa"
            username="Bolek"
            date="11.10.2025 10:00"
          />
        ))}
      </section>
      <Link to="/reports" className={style.button}>
        <span>Zobacz więcej</span> <MdOutlineReadMore size={"2rem"} />
      </Link>
    </section>
  );
}
