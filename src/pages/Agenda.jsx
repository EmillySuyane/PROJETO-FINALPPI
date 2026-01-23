import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { supabase } from "../services/supabase";
import styles from "./Agenda.module.css";

export default function Agenda() {
  const { events, setEvents } = useApp();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const { data: tasks, error } = await supabase
      .from("tasks")
      .select("*")
      .order("data", { ascending: true });

    if (error) {
      console.error("Erro ao buscar tarefas:", error);
    } else {
      setEvents(tasks || []);
    }
  }

  async function addEvent() {
    if (!titulo || !data) return;
    setLoading(true);

    const { data: newTask, error } = await supabase
      .from("tasks")
      .insert([{ titulo, descricao, data, status: "pendente" }])
      .select();

    if (error) {
      console.error("Erro ao adicionar tarefa:", error);
    } else {
      setEvents([...events, ...newTask]);
      setTitulo("");
      setDescricao("");
      setData("");
    }
    setLoading(false);
  }

  async function deleteEvent(id) {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erro ao deletar tarefa:", error);
    } else {
      setEvents(events.filter((event) => event.id !== id));
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>📅 Agenda</h1>

      <div className={styles.card}>
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <textarea
            placeholder="Descrição (opcional)"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />

          <button onClick={addEvent} disabled={loading}>
            {loading ? "Adicionando..." : "Adicionar"}
          </button>
        </div>
      </div>

      <div className={styles.list}>
        {events.map((event) => (
          <div key={event.id} className={styles.event}>
            <div className={styles.eventInfo}>
              <span><strong>{event.titulo}</strong></span>
              {event.descricao && <p>{event.descricao}</p>}
              <small>{event.data}</small>
              <small>Status: {event.status}</small>
            </div>
            <button
              className={styles.deleteBtn}
              onClick={() => deleteEvent(event.id)}
              title="Deletar tarefa"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}