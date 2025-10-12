import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CommentSection from "../../components/CommentSection";
import Map from "../../components/Map";
// Upewnij się, że ścieżki są poprawne
import VoteButton from "../../components/VoteButton";
import styles from "./index.module.css";

// Upewnij się, że ścieżki są poprawne

const Report = () => {
  const { id: incidentId } = useParams(); // Pobieramy id z URL

  // Stany do zarządzania danymi, ładowaniem i błędami
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect uruchomi się raz po załadowaniu komponentu (i jeśli incidentId się zmieni)
  useEffect(() => {
    const fetchIncident = async () => {
      try {
        // Ustawiamy stan ładowania na true przed wysłaniem żądania
        setLoading(true);
        // Wysłanie żądania GET do API
        const response = await axios.get(
          `http://localhost:3000/report/${incidentId}`,
        );
        // Zapisanie pobranych danych w stanie
        setIncident(response.data);
        setError(null); // Czyszczenie ewentualnych starych błędów
      } catch (err) {
        // Obsługa błędu, jeśli żądanie się nie powiedzie
        setError("Nie udało się pobrać danych zdarzenia.");
        console.error(err);
      } finally {
        // Zatrzymanie stanu ładowania niezależnie od wyniku
        setLoading(false);
      }
    };

    fetchIncident();
  }, [incidentId]); // Tablica zależności - efekt uruchomi się ponownie, gdy incidentId się zmieni

  // Renderowanie warunkowe
  if (loading) {
    return <div className={styles.pageContainer}>Ładowanie danych...</div>;
  }

  if (error) {
    return <div className={styles.pageContainer}>{error}</div>;
  }

  if (!incident) {
    return (
      <div className={styles.pageContainer}>Nie znaleziono zdarzenia.</div>
    );
  }

  // Gdy dane są już załadowane, renderujemy główny widok

  return (
    <div className={styles.pageContainer}>
      <div className={styles.incidentLayout}>
        <div className={styles.mapColumn}>
          <Map coordinates={[incident.latitude, incident.longitude]} />
        </div>
        <div className={styles.infoColumn}>
          <div className={styles.header}>
            <h1 className={styles.title}>{incident.konfidentCategory}</h1>
            <VoteButton
              count={incident.upvotes - incident.downvotes}
              id={incidentId}
            />
          </div>
          <div className={styles.metaInfo}>
            <span className={styles.metaItem}>
              📍{" "}
              {`${incident.street}, ${incident.postalCode}, ${incident.City}`}
            </span>
            <span className={styles.metaItem}>
              👤{" "}
              {`${incident.firstName} ${incident.lastName} (${incident.nickname})`}
            </span>
            <span className={styles.metaItem}>📅 {incident.date}</span>
          </div>
          <div className={styles.description}>
            <p>{incident.title}</p>
          </div>
        </div>
      </div>
      <div className={styles.commentsSection}>
        {/* Przekazujemy ID do komponentu z komentarzami */}
        <CommentSection id={incidentId} />
      </div>
    </div>
  );
};

export default Report;
