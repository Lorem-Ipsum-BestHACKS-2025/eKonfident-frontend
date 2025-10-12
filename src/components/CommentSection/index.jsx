import axios from "axios";
import React, { useEffect, useState } from "react";

import styles from "./index.module.css";

const CommentSection = ({ id }) => {
  // Stan dla listy komentarzy
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stan dla danych z formularza
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    nickname: "",
    content: "",
    email: "",
    reportId: parseInt(id),
  });

  // Funkcja do pobierania komentarzy
  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/comment/${id}`);
      setComments(response.data);
      setError(null);
    } catch (err) {
      setError("Nie udało się załadować komentarzy.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Pobieranie komentarzy po załadowaniu komponentu
  useEffect(() => {
    fetchComments();
  }, [id]); // Zależność od ID zdarzenia

  // Funkcja do obsługi zmian w polach formularza
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Funkcja do wysyłania nowego komentarza
  const handleSubmit = async (e) => {
    e.preventDefault(); // Zapobiega przeładowaniu strony

    // Prosta walidacja
    if (!formData.nickname || !formData.content) {
      alert("Pseudonim i treść komentarza są wymagane!");
      return;
    }

    try {
      // Wysłanie żądania POST
      await axios.post(`http://localhost:3000/comment`, formData);

      // Czyszczenie formularza po wysłaniu
      setFormData({
        firstname: "",
        lastname: "",
        nickname: "",
        content: "",
        email: "",
      });

      // Odświeżenie listy komentarzy, aby pokazać nowy
      fetchComments();
    } catch (err) {
      alert("Wystąpił błąd podczas dodawania komentarza.");
      console.error(err);
    }
  };

  console.log(formData);

  return (
    <div className={styles.commentsWrapper}>
      <h2 className={styles.header}>Komentarze</h2>
      <div className={styles.commentList}>
        {loading && <p>Ładowanie komentarzy...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && comments.length === 0 && (
          <p>Brak komentarzy. Bądź pierwszy!</p>
        )}
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <p
              className={styles.commentAuthor}
            >{`${comment.firstName} ${comment.lastName} (${comment.nickname})`}</p>
            <p className={styles.commentText}>{comment.content}</p>
          </div>
        ))}
      </div>

      {/* Formularz został opakowany w tag <form> z obsługą onSubmit */}
      <form onSubmit={handleSubmit}>
        <div className={styles.user}>
          <input
            type="text"
            name="firstname"
            placeholder="Imię"
            value={formData.firstname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Nazwisko"
            value={formData.lastname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="nickname"
            placeholder="Pseudonim"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.addComment}>
          <textarea
            name="content"
            className={styles.commentInput}
            placeholder="Dodaj swój komentarz..."
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className={styles.submitButton}>
            Skomentuj
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
