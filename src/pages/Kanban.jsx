import { useState } from "react";
import { useApp } from "../context/AppContext";
import styles from "./Kanban.module.css";

export default function Kanban() {
  const { tasks, setTasks } = useApp();
  const [title, setTitle] = useState("");

  function addTask() {
    if (!title) return;
    setTasks([...tasks, { id: Date.now(), title, status: "todo" }]);
    setTitle("");
  }

  function moveTask(id, status) {
    setTasks(
      tasks.map(t =>
        t.id === id ? { ...t, status } : t
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const columnConfig = [
    { key: "todo", label: "FAZER", icon: "📋", color: "#ff6b6b" },
    { key: "doing", label: "FAZENDO", icon: "⚙️", color: "#ffd93d" },
    { key: "done", label: "FEITO", icon: "✅", color: "#6bcf7f" }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>📊 Kanban Board</h1>
      </div>

      <div className={styles.addSection}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyPress={e => e.key === "Enter" && addTask()}
          placeholder="Digite uma nova tarefa..."
          className={styles.input}
        />
        <button onClick={addTask} className={styles.addBtn}>Adicionar</button>
      </div>

      <div className={styles.board}>
        {columnConfig.map(col => (
          <div key={col.key} className={styles.column}>
            <div className={styles.columnHeader}>
              <h2>
                <span className={styles.icon}>{col.icon}</span>
                {col.label}
              </h2>
              <span className={styles.badge}>
                {tasks.filter(t => t.status === col.key).length}
              </span>
            </div>

            <div className={styles.taskList}>
              {tasks
                .filter(t => t.status === col.key)
                .map(t => (
                  <div key={t.id} className={styles.task}>
                    <div className={styles.taskContent}>
                      <p className={styles.taskTitle}>{t.title}</p>
                    </div>

                    <div className={styles.taskActions}>
                      {col.key !== "todo" && (
                        <button
                          className={styles.actionBtn}
                          onClick={() => moveTask(t.id, "todo")}
                          title="Mover para FAZER"
                        >
                          ◀
                        </button>
                      )}
                      {col.key !== "doing" && (
                        <button
                          className={styles.actionBtn}
                          onClick={() => moveTask(t.id, "doing")}
                          title="Mover para FAZENDO"
                        >
                          ▶
                        </button>
                      )}
                      {col.key !== "done" && (
                        <button
                          className={styles.actionBtn}
                          onClick={() => moveTask(t.id, "done")}
                          title="Mover para FEITO"
                        >
                          ✓
                        </button>
                      )}
                      <button
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        onClick={() => deleteTask(t.id)}
                        title="Deletar tarefa"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
