import { Link } from "react-router-dom";

import style from "./index.module.css";

export default function Navbar() {
  return (
    <nav className={style.nav}>
      <Link to="/">Dashboard</Link>
      <Link to="/report">Reports</Link>
      <Link to="/leaderboards">Leaderboard</Link>
      <button className={style.button}>Button</button>
    </nav>
  );
}
