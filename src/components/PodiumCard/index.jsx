import style from "./index.module.css";

export default function PodiumCard({ user }) {
  return (
    <div className={style.podiumCard}>
      <div className={style.podiumAvatar}>{user.rank}</div>
      <div
        className={style.name}
      >{`${user.name} ${user.lastName} ${user.username != null || user.username != undefined ? `(${user.username})` : ""}`}</div>
      <div className={style.points}>{user.points} Points</div>
    </div>
  );
}
