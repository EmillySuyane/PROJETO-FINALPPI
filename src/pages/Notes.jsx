import { useState } from "react";
import { useApp } from "../context/AppContext";
import styles from "./Notes.module.css";

export default function Notes() {
  const { notes, setNotes } = useApp();
  const [text, setText] = useState("");

  function addNote() {
    if (!text.trim()) return;
    setNotes([...notes, { 
      id: Date.now(), 
      text,
      createdAt: new Date().toLocaleDateString('pt-BR')
    }]);
    setText("");
  }

  function deleteNote(id) {
    setNotes(notes.filter(note => note.id !== id));
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && e.ctrlKey) {
      addNote();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>📝 Minhas Anotações</h1>
        <p className={styles.subtitle}>Crie suas notas rápidas e as organize</p>
      </div>

      <div className={styles.addSection}>
        <textarea
          className={styles.textarea}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escreva sua anotação aqui... (Ctrl+Enter para salvar)"
        />

        <button 
          className={styles.button} 
          onClick={addNote}
          disabled={!text.trim()}
        >
          💾 Salvar Anotação
        </button>
      </div>

      <div className={styles.notesGrid}>
        {notes.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyIcon}>📭</p>
            <p className={styles.emptyText}>Nenhuma anotação ainda. Comece criando uma!</p>
          </div>
        ) : (
          notes.map(note => (
            <div key={note.id} className={styles.noteCard}>
              <div className={styles.noteContent}>
                <p className={styles.noteText}>{note.text}</p>
                <small className={styles.noteDate}>{note.createdAt}</small>
              </div>
              <button
                className={styles.deleteBtn}
                onClick={() => deleteNote(note.id)}
                title="Deletar anotação"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
