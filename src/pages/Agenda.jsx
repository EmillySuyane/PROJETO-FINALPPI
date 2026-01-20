import { useState } from "react";
import { useApp } from "../context/AppContext";
import styles from "./Agenda.module.css";

export default function Agenda() {
  const { events, setEvents } = useApp();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  function addEvent() {
    if (!title || !date) return;

    setEvents([...events, { id: Date.now(), title, date }]);
    setTitle("");
    setDate("");
  }

  function deleteEvent(id) {
    setEvents(events.filter((event) => event.id !== id));
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>📅 Agenda</h1>

      <div className={styles.card}>
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Nome do evento"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button onClick={addEvent}>Adicionar</button>
        </div>
      </div>

      <div className={styles.list}>
        {events.map((event) => (
          <div key={event.id} className={styles.event}>
            <div className={styles.eventInfo}>
              <span>{event.title}</span>
              <small>{event.date}</small>
            </div>
            <button
              className={styles.deleteBtn}
              onClick={() => deleteEvent(event.id)}
              title="Deletar evento"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
