import style from "./index.module.css";

export default function LeaderboardListItem({ user }) {
  return (
    <div className={style.listItem}>
      <div className={style.rankInfo}>
        <div className={style.rankNumber}>{user.rank}</div>
        <div
          className={style.listName}
        >{`${user.name} ${user.lastName} ${user.username != null || user.username != undefined ? `(${user.username})` : ""}`}</div>
      </div>
      <div className={style.listPoints}>{user.points} Points</div>
    </div>
  );
}
