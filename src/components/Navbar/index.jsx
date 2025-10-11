import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/report">Reports</Link>
      <Link to="/leaderboards">Leaderboard</Link>
    </nav>
  );
}
