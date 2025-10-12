import React from "react";
import { useParams } from "react-router-dom";

import VoteButton from "../../components//VoteButton";
import CommentSection from "../../components/CommentSection";
import Map from "../../components/Map";
import styles from "./index.module.css";

/**
 * Dokumentacja komponentu IncidentDetails
 * * @param {object} props - Właściwości komponentu.
 * @param {object} props.incident - Obiekt zawierający wszystkie dane o zdarzeniu.
 * @returns {JSX.Element} Kompletna strona ze szczegółami zdarzenia.
 */
const Report = () => {
  const params = useParams();
  const incidentId = params.id;
  console.log(incidentId);
  const incident = {
    title: "Patrol Policji",
    address: "sezamkowa",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam quasi itaque quam porro earum quis quos? Repellendus ex laborum aperiam eos fugiat necessitatibus placeat similique voluptates quibusdam, modi aspernatur eum.",
    author: "Tomasz Problem",
    date: "12-10-2025 10:00",
    coordinates: [51.9189046, 19.1343786],
    score: 10,
  };

  const { title, address, description, author, date, coordinates, score } =
    incident;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.incidentLayout}>
        {/* Lewa kolumna z mapą */}
        <div className={styles.mapColumn}>
          <Map coordinates={coordinates} />
        </div>

        {/* Prawa kolumna z informacjami */}
        <div className={styles.infoColumn}>
          <div className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <VoteButton count={score} />
          </div>

          <div className={styles.metaInfo}>
            <span className={styles.metaItem}>📍 {address}</span>
            <span className={styles.metaItem}>👤 {author}</span>
            <span className={styles.metaItem}>📅 {date}</span>
          </div>

          <div className={styles.description}>
            <p>{description}</p>
          </div>
        </div>
      </div>

      <div className={styles.commentsSection}>
        <CommentSection id={incidentId} />
      </div>
    </div>
  );
};

export default Report;
