import React from "react";

import styles from "./index.module.css";

/**
 * Dokumentacja komponentu CommentSection
 * @returns {JSX.Element} Komponent sekcji komentarzy.
 */
const CommentSection = ({ id }) => {
  console.log(id);
  // Na razie dane są statyczne. W przyszłości mogą pochodzić z API.
  const comments = [
    { id: 1, author: "Jan Kowalski", text: "Też to widziałem, potwierdzam!" },
    {
      id: 2,
      author: "Anna Nowak",
      text: "Dzięki za informację, będę omijać tę okolicę.",
    },
  ];

  return (
    <div className={styles.commentsWrapper}>
      <h2 className={styles.header}>Komentarze</h2>
      <div className={styles.commentList}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <p className={styles.commentAuthor}>{comment.author}</p>
            <p className={styles.commentText}>{comment.text}</p>
          </div>
        ))}
      </div>
      <div>
        <input type="text" placeholder="Imię" />
        <input type="text" placeholder="Nazwisko" />
        <input type="text" placeholder="Pseudonum" />
      </div>
      <div className={styles.addComment}>
        <textarea
          className={styles.commentInput}
          placeholder="Dodaj swój komentarz..."
        ></textarea>
        <button className={styles.submitButton}>Skomentuj</button>
      </div>
    </div>
  );
};

export default CommentSection;
