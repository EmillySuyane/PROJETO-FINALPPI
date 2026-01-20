import { useState } from "react";
import { useApp } from "../context/AppContext";
import styles from "./Materias.module.css";

export default function Materias() {
  const { subjects, setSubjects } = useApp();
  const [name, setName] = useState("");
  const [professor, setProfessor] = useState("");
  const [schedule, setSchedule] = useState("");

  function addSubject() {
    if (!name.trim()) return;
    setSubjects([...subjects, { 
      id: Date.now(), 
      name,
      professor,
      schedule,
      color: getRandomColor()
    }]);
    setName("");
    setProfessor("");
    setSchedule("");
  }

  function deleteSubject(id) {
    setSubjects(subjects.filter(s => s.id !== id));
  }

  function getRandomColor() {
    const colors = [
      "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", 
      "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>📚 Minhas Disciplinas</h1>
        <p className={styles.subtitle}>Organize suas matérias e acompanhe seus estudos</p>
      </div>

      <div className={styles.addSection}>
        <div className={styles.formGroup}>
          <label>Nome da Disciplina</label>
          <input
            placeholder="Ex: Matemática"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyPress={e => e.key === "Enter" && addSubject()}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Professor(a)</label>
          <input
            placeholder="Ex: João Silva"
            value={professor}
            onChange={e => setProfessor(e.target.value)}
            onKeyPress={e => e.key === "Enter" && addSubject()}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Horário</label>
          <input
            placeholder="Ex: Seg/Qua 10:00"
            value={schedule}
            onChange={e => setSchedule(e.target.value)}
            onKeyPress={e => e.key === "Enter" && addSubject()}
            className={styles.input}
          />
        </div>

        <button onClick={addSubject} className={styles.addBtn}>
          ➕ Adicionar Disciplina
        </button>
      </div>

      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{subjects.length}</span>
          <span className={styles.statLabel}>Disciplinas</span>
        </div>
      </div>

      {subjects.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>📭</p>
          <p className={styles.emptyText}>Nenhuma disciplina adicionada. Comece criando uma!</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {subjects.map(s => (
            <div 
              key={s.id} 
              className={styles.card}
              style={{ borderLeftColor: s.color }}
            >
              <div className={styles.cardHeader}>
                <div 
                  className={styles.colorDot}
                  style={{ backgroundColor: s.color }}
                />
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteSubject(s.id)}
                  title="Deletar disciplina"
                >
                  🗑️
                </button>
              </div>

              <h3 className={styles.cardTitle}>{s.name}</h3>

              {s.professor && (
                <div className={styles.cardInfo}>
                  <span className={styles.infoIcon}>👨‍🏫</span>
                  <span>{s.professor}</span>
                </div>
              )}

              {s.schedule && (
                <div className={styles.cardInfo}>
                  <span className={styles.infoIcon}>🕐</span>
                  <span>{s.schedule}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
