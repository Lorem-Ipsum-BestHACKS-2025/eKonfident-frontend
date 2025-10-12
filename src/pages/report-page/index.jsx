import axios from "axios";
import React, { useState } from "react";

import Button from "../../components/Button";
import MapPicker from "../../components/MapPicker";
import style from "./index.module.css";

const INCIDENT_CATEGORIES = [
  { value: "VANDALISM", label: "Wandalizm" },
  { value: "PARKING_VIOLATION", label: "Naruszenie przepisów parkingowych" },
  { value: "HOMELESS", label: "Osoba bezdomna w potrzebie" },
  { value: "ROBBERY", label: "Rozbój / Kradzież" },
  { value: "AGRESSIVE_PERSON", label: "Agresywna osoba" },
];

export default function ReportPage() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    nickname: "",
    email: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: null,
  });

  const [apiState, setApiState] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLocationPick = (latlng) => {
    setFormState((prevState) => ({
      ...prevState,
      location: latlng,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.location) {
      setApiState({
        loading: false,
        error: "Proszę wybrać lokalizację na mapie.",
        success: false,
      });
      return;
    }

    setApiState({ loading: true, error: null, success: false });

    const combinedDate = new Date(`${formState.date}T${formState.time}`);

    const payload = {
      email: formState.email,
      firstName: formState.firstName,
      lastName: formState.lastName,
      nickname: formState.nickname,
      konfident: true,
      konfidentCategory: formState.category,
      note: formState.description,
      date: combinedDate.toISOString(),
      latitude: formState.location.lat,
      longitude: formState.location.lng,
    };

    try {
      await axios.post("http://localhost:3000/report", payload);
      setApiState({ loading: false, error: null, success: true });
      setFormState({
        firstName: "",
        lastName: "",
        nickname: "",
        email: "",
        description: "",
        category: "",
        date: "",
        time: "",
        location: null,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Wystąpił błąd podczas wysyłania zgłoszenia.";
      setApiState({ loading: false, error: errorMessage, success: false });
    }
  };

  return (
    <div className={style.incidentReportContainer}>
      <div className={style.incidentReportCard}>
        <header>
          <h1>Zgłoś incydent</h1>
          <p>Strzel z ucha jak najdokładniej</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className={style.nameGroup}>
            <div className={style.formGroup}>
              <label htmlFor="firstName" className={style.formLabel}>
                Imię
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className={style.formInput}
                value={formState.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={style.formGroup}>
              <label htmlFor="lastName" className={style.formLabel}>
                Nazwisko
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className={style.formInput}
                value={formState.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={style.formGroup}>
            <label htmlFor="nickname" className={style.formLabel}>
              Pseudonim (opcjonalnie)
            </label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              className={style.formInput}
              value={formState.nickname}
              onChange={handleChange}
            />
          </div>

          <div className={style.formGroup}>
            <label htmlFor="email" className={style.formLabel}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={style.formInput}
              value={formState.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label htmlFor="category" className={style.formLabel}>
              Kategoria
            </label>
            <select
              id="category"
              name="category"
              className={style.formSelect}
              value={formState.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Wybierz kategorię
              </option>
              {INCIDENT_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className={style.formGroup}>
            <label htmlFor="description" className={style.formLabel}>
              Opis
            </label>
            <textarea
              id="description"
              name="description"
              className={style.formTextarea}
              placeholder="Opisz dokładnie co się dzieje..."
              value={formState.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className={style.datetimeGroup}>
            <div className={style.formGroup}>
              <label htmlFor="date" className={style.formLabel}>
                Data
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className={style.formInput}
                value={formState.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className={style.formGroup}>
              <label htmlFor="time" className={style.formLabel}>
                Czas
              </label>
              <input
                id="time"
                name="time"
                type="time"
                className={style.formInput}
                value={formState.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <MapPicker
            onLocationPick={handleLocationPick}
            className={style.map}
          />
          {formState.location && (
            <p
              style={{
                fontSize: "14px",
                color: "var(--lightest)",
                marginTop: "-15px",
              }}
            >
              <b>Lokalizacja: </b> Lat: {formState.location.lat.toFixed(4)},
              Lng: {formState.location.lng.toFixed(4)}
            </p>
          )}

          {apiState.success && (
            <p className={style.successMessage}>
              Zgłoszenie zostało pomyślnie wysłane!
            </p>
          )}
          {apiState.error && (
            <p className={style.errorMessage}>{apiState.error}</p>
          )}

          <Button type="submit" disabled={apiState.loading}>
            {apiState.loading ? "Wysyłanie..." : "Wyślij Zgłoszenie →"}
          </Button>
        </form>
      </div>
    </div>
  );
}
