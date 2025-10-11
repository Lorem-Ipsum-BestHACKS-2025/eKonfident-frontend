import { Link } from "react-router-dom";

import Button from "../Button";
import style from "./index.module.css";

export default function Navbar() {
  return (
    <nav className={style.nav}>
      <Link to="/" className={style.link}>
        Dashboard
      </Link>
      <Link to="/report" className={style.link}>
        Reports
      </Link>
      <Link to="/leaderboards" className={style.link}>
        Leaderboard
      </Link>
      <Button to="/"> + Button</Button>
    </nav>
  );
}
