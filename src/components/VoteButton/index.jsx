import style from "./index.module.css";

export default function VoteButton({ className, id, count, voteGiven = 0 }) {
  return (
    <section className={`${style.component} ${className}`}>
      {voteGiven > 0 ? (
        <button disabled>+</button>
      ) : (
        <button onClick={() => addVote(id, voteGiven, 1)}>+</button>
      )}
      <span>{count}</span>
      {voteGiven < 0 ? (
        <button disabled>-</button>
      ) : (
        <button onClick={() => addVote(id, voteGiven, -1)}>-</button>
      )}
    </section>
  );
}

function addVote(id, voteGiven, vote) {
  console.log(id, voteGiven, vote);
}
