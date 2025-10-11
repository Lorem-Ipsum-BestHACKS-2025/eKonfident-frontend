import { MdReport } from "react-icons/md";
import { Link } from "react-router-dom";

import Button from "../Button";
import style from "./index.module.css";

export default function Navbar() {
  return (
    <nav className={style.nav}>
      <section>
        <MdReport size="2.5rem" /> eKonfident
      </section>
      <section className={style.links}>
        <Link to="/" className={style.link}>
          Strona Główna
        </Link>
        <Link to="/report" className={style.link}>
          Zgłoszenia
        </Link>
        <Link to="/leaderboards" className={style.link}>
          Rankingi
        </Link>
        <Button to="/"> + Dodaj zgłoszenie</Button>
      </section>
    </nav>
  );
}
