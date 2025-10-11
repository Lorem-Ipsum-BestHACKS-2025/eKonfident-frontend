import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard";
import LeaderboardPage from "./pages/leaderboard-page";
import ReportPage from "./pages/report-page";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
