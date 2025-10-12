import CommentButton from "../CommentButton";
import VoteButton from "../VoteButton";
import style from "./index.module.css";

export default function IncidentRecord({
  className,
  id,
  title,
  address,
  description,
  name,
  username,
  date,
}) {
  return (
    <section className={`${style.record} ${className}`}>
      <section className={style.content}>
        <header className={style.title}>{title}</header>
        <section>{address}</section>
        <section className={style.description}>{description}</section>
        <section className={style.footnote}>
          <section>
            {name} | pseudonim: {username}
          </section>
          <section>{date}</section>
        </section>
      </section>
      <section className={style.buttons}>
        <VoteButton id={id} voteGiven={0} count={200} />
        <CommentButton id={id} />
      </section>
    </section>
  );
}
