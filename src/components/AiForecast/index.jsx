import { FaBrain } from "react-icons/fa";

import style from "./index.module.css";

export default function AiForecast({ className = "" }) {
  return (
    <div className={`${style.tile} ${className}`}>
      <div>
        <FaBrain size={"4rem"} />
      </div>
      <div>
        <header>AI Overview</header>
        Najwięcej zgłoszeń (46) pochodzi z Łodzi, dominują patrole policyjne
        (10) i naruszenia parkowania (7). Zauważalna koncentracja incydentów w
        obrębie pl. Leśna i pl. Kościelna w Łodzi. Alarmujące są zgłoszenia o
        rozbojach w Łodzi (3), wymagają dalszej weryfikacji. Dwa incydenty
        związane z patrolami policyjnymi zgłoszono w Krakowie, na ulicy
        Policyjnej 1.
      </div>
    </div>
  );
}
