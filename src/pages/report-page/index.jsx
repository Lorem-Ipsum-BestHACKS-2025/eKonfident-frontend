import React, { useState } from "react";

import Button from "../../components/Button";
import MapPicker from "../../components/MapPicker";
import style from "./index.module.css";

const INCIDENT_CATEGORIES = [
  "Vandalism/Property Damage",
  "Safety Hazard",
  "Illegal Dumping",
  "Noise Complaint",
  "Other",
];

export default function ReportPage() {
  const [formState, setFormState] = useState({
    description: "",
    category: "",
    date: "",
    time: "",
    location: null, // Stores { lat, lng } from the map
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
    console.log("Location picked:", latlng);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Report:", formState);
    alert("Report Submitted! Check console for data.");
  };

  return (
    <div className={style.incidentReportContainer}>
      <div className={style.incidentReportCard}>
        <header>
          <h1>Zgłoś incydent</h1>
          <p>Strzel z ucha jak najdokładniej</p>
        </header>

        <form onSubmit={handleSubmit}>
          {/* Category (Dropdown List) */}
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
                <option key={cat} value={cat}>
                  {cat}
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

          {/* Date and Time */}
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

          <Button type="submit">Wyślij Zgłoszenie →</Button>
        </form>
      </div>
    </div>
  );
}
