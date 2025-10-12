import axios from "axios";
import React, { useState } from "react";

import Button from "../../components/Button";
import MapPicker from "../../components/MapPicker";
import style from "./index.module.css";

const WARNING_CATEGORIES = [
  { value: "POLICE_PATROL", label: "Patrol Policji" },
  { value: "UNDERCOVER_COPS", label: "Nieoznakowany patrol" },
  { value: "SPEED_CAMERA", label: "Fotoradar" },
  { value: "ROADBLOCK", label: "Blokada drogowa / Kontrola" },
  { value: "PARKING_ENFORCEMENT", label: "Straż miejska (Parking)" },
];

export default function ReportPage() {
  const [formState, setFormState] = useState({
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
      konfident: false,
      nieKonfidentCategory: formState.category,
      note: formState.description,
      date: combinedDate.toISOString(),
      latitude: formState.location.lat,
      longitude: formState.location.lng,
      // Hardcoded email as it's required by the DTO but not collected in this form
      email: "warning-reporter@example.com",
    };

    try {
      await axios.post("http://localhost:3000/report", payload);
      setApiState({ loading: false, error: null, success: true });
      setFormState({
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
          <h1>Dodaj Ostrzeżenie</h1>
          <p>Ostrzeż dobrych ziomków.</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="category" className={style.formLabel}>
              Kategoria Ostrzeżenia
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
              {WARNING_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className={style.formGroup}>
            <label htmlFor="description" className={style.formLabel}>
              Dodatkowy opis (opcjonalnie)
            </label>
            <textarea
              id="description"
              name="description"
              className={style.formTextarea}
              placeholder="Np. 'Stoją za przystankiem', 'Kontrola trzeźwości'..."
              value={formState.description}
              onChange={handleChange}
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
              Ostrzeżenie zostało pomyślnie dodane!
            </p>
          )}
          {apiState.error && (
            <p className={style.errorMessage}>{apiState.error}</p>
          )}

          <Button type="submit" disabled={apiState.loading}>
            {apiState.loading ? "Wysyłanie..." : "Dodaj Ostrzeżenie →"}
          </Button>
        </form>
      </div>
    </div>
  );
}
