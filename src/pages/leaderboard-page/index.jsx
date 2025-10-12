import { useEffect, useState } from "react";

import LeaderboardListItem from "../../components/LeaderboardListItem";
import PodiumCard from "../../components/PodiumCard";
import { api } from "../../utils/api";
import style from "./index.module.css";

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await api.leaderboard.get({ konfident: false });

        // Limit to top 20 results and transform the data
        const limitedData = data.slice(0, 20);
        const transformedData = limitedData.map((item, index) => ({
          rank: index + 1,
          name: item.firstName || "Anonim",
          lastName: item.lastName || "",
          points: item.score || 0,
          email: item.email,
        }));

        setLeaderboardData(transformedData);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
        setError("Nie można załadować tabeli wyników");

        // Fallback to dummy data if API fails
        setLeaderboardData([
          { rank: 1, name: "Sophia", lastName: "Kowalski", points: 1500 },
          { rank: 2, name: "Jan", lastName: "Nowak", points: 1450 },
          { rank: 3, name: "Anna", lastName: "Zielinski", points: 1400 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="leaderboardContainer">
        <header className={style.header}>
          <h1 className="mainTitle">Naczelni konfidenci</h1>
          <p className="subtitle">Ładowanie tabeli wyników...</p>
        </header>
      </div>
    );
  }

  const topThree = leaderboardData.slice(0, 3);
  const remainingRanks = leaderboardData.slice(3);

  return (
    <div className="leaderboardContainer">
      <header className={style.header}>
        <h1 className="mainTitle">Naczelne gity</h1>
        <p className="subtitle">{error ? error : "To ci dbają o ziomków."}</p>
      </header>
      <div className={style.podiumGrid}>
        {topThree.map((user) => (
          <PodiumCard key={user.rank} user={user} />
        ))}
      </div>
      <div className={style.rankingList}>
        {remainingRanks.map((user) => (
          <LeaderboardListItem key={user.rank} user={user} />
        ))}
      </div>
    </div>
  );
}
