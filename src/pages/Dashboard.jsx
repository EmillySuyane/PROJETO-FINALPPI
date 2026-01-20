import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { tasks, notes, events, subjects } = useApp();
  const navigate = useNavigate();

  const doneTasks = tasks.filter(t => t.status === "done").length;
  const pendingTasks = tasks.filter(t => t.status !== "done").length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const upcomingTasks = tasks
    .filter(t => t.status !== "done")
    .slice(0, 3);

  const upcomingEvents = events
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);
    
  const latestNotes = notes.slice(-3).reverse();

  const getProgressColor = (value) => {
    if (value >= 75) return "#6bcf7f";
    if (value >= 50) return "#ffd93d";
    return "#ff6b6b";
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>👋 Bem-vindo(a), {user?.name}!</h1>
          <p className={styles.subtitle}>Aqui está um resumo do seu progresso</p>
        </div>
        <div className={styles.date}>
          {new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
          })}
        </div>
      </div>

      {/* STATS CARDS */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Tarefas Concluídas</p>
            <p className={styles.statValue}>{doneTasks}</p>
            <small className={styles.statSubtitle}>de {totalTasks} total</small>
          </div>
          <div className={styles.statIcon}>✅</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Tarefas Pendentes</p>
            <p className={styles.statValue}>{pendingTasks}</p>
            <small className={styles.statSubtitle}>em andamento</small>
          </div>
          <div className={styles.statIcon}>⏳</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Progresso</p>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{
                  width: `${completionRate}%`,
                  backgroundColor: getProgressColor(completionRate)
                }}
              />
            </div>
            <small className={styles.statSubtitle}>{completionRate}% concluído</small>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Suas Anotações</p>
            <p className={styles.statValue}>{notes.length}</p>
            <small className={styles.statSubtitle}>notas criadas</small>
          </div>
          <div className={styles.statIcon}>📝</div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className={styles.mainGrid}>
        {/* PRÓXIMAS TAREFAS */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>📋 Próximas Tarefas</h2>
            <button 
              className={styles.seeAll}
              onClick={() => navigate("/kanban")}
            >
              Ver todas
            </button>
          </div>
          
          {upcomingTasks.length === 0 ? (
            <div className={styles.empty}>
              <p>🎉 Nenhuma tarefa pendente! Você está em dia!</p>
            </div>
          ) : (
            <div className={styles.tasksList}>
              {upcomingTasks.map(task => (
                <div key={task.id} className={styles.taskItem}>
                  <span className={styles.taskStatus}>
                    {task.status === "doing" ? "⚙️" : "📋"}
                  </span>
                  <p className={styles.taskText}>{task.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PRÓXIMOS EVENTOS */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>📅 Próximos Eventos</h2>
            <button 
              className={styles.seeAll}
              onClick={() => navigate("/agenda")}
            >
              Ver agenda
            </button>
          </div>
          
          {upcomingEvents.length === 0 ? (
            <div className={styles.empty}>
              <p>📭 Nenhum evento agendado</p>
            </div>
          ) : (
            <div className={styles.eventsList}>
              {upcomingEvents.map(event => (
                <div key={event.id} className={styles.eventItem}>
                  <div className={styles.eventDate}>
                    {new Date(event.date).toLocaleDateString('pt-BR')}
                  </div>
                  <p className={styles.eventTitle}>{event.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SEGUNDA LINHA */}
      <div className={styles.mainGrid}>
        {/* DISCIPLINAS */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>📚 Suas Disciplinas</h2>
            <button 
              className={styles.seeAll}
              onClick={() => navigate("/materias")}
            >
              Gerenciar
            </button>
          </div>
          
          {subjects.length === 0 ? (
            <div className={styles.empty}>
              <p>Adicione suas disciplinas para acompanhar</p>
            </div>
          ) : (
            <div className={styles.subjectsList}>
              {subjects.slice(0, 4).map(subject => (
                <div key={subject.id} className={styles.subjectBadge}>
                  {subject.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ÚLTIMAS ANOTAÇÕES */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>📝 Últimas Anotações</h2>
            <button 
              className={styles.seeAll}
              onClick={() => navigate("/notes")}
            >
              Ver todas
            </button>
          </div>
          
          {latestNotes.length === 0 ? (
            <div className={styles.empty}>
              <p>Comece criando suas anotações</p>
            </div>
          ) : (
            <div className={styles.notesList}>
              {latestNotes.map(note => (
                <div key={note.id} className={styles.notePreview}>
                  <p className={styles.notePreviewText}>
                    {note.text.substring(0, 60)}...
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
