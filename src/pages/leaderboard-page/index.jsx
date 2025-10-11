import LeaderboardListItem from "../../components/LeaderboardListItem";
import PodiumCard from "../../components/PodiumCard";
import style from "./index.module.css";

// Dummy data for the leaderboard
const leaderboardData = [
  { rank: 1, name: "Sophia", lastName: "Kowalski", points: 1500 },
  { rank: 2, name: "Jan Nowak", lastName: "", points: 1450 },
  { rank: 3, name: "Anna Zielinski", lastName: "", points: 1400 },
  { rank: 4, name: "Piotr Lewandowski", lastName: "", points: 1350 },
  { rank: 5, name: "Maria Wisniewski", lastName: "", points: 1300 },
  { rank: 6, name: "Krzysztof Kaminski", lastName: "", points: 1250 },
  { rank: 7, name: "Magdalena Mazur", lastName: "", points: 1200 },
  { rank: 8, name: "Tomasz Jankowski", lastName: "", points: 1150 },
  { rank: 9, name: "Barbara Wojciechowski", lastName: "", points: 1100 },
  { rank: 10, name: "Andrzej Malinowski", lastName: "", points: 1050 },
];

export default function LeaderboardPage() {
  const topThree = leaderboardData.slice(0, 3);
  const remainingRanks = leaderboardData.slice(3);

  return (
    <div className="leaderboardContainer">
      <header className={style.header}>
        <h1 className="mainTitle">Naczelni konfidenci</h1>
        <p className="subtitle">To ci jedzą makowca na komendzie.</p>
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
