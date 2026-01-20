import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar({ collapsed }) {
  return (
    <aside
      className={`${styles.sidebar} ${
        collapsed ? styles.collapsed : ""
      }`}
    >
      <nav className={styles.nav}>
        {!collapsed && <div className={styles.sectionTitle}>Seu Espaço</div>}
        
        <div className={styles.navSection}>
          <NavLink to="/dashboard" className={styles.navLink}>
            <span className={styles.icon}>🏠</span>
            {!collapsed && <span>Dashboard</span>}
          </NavLink>
          <NavLink to="/agenda" className={styles.navLink}>
            <span className={styles.icon}>📅</span>
            {!collapsed && <span>Agenda</span>}
          </NavLink>
          <NavLink to="/kanban" className={styles.navLink}>
            <span className={styles.icon}>📌</span>
            {!collapsed && <span>Kanban</span>}
          </NavLink>
          <NavLink to="/notes" className={styles.navLink}>
            <span className={styles.icon}>📝</span>
            {!collapsed && <span>Notes</span>}
          </NavLink>
        </div>

        {!collapsed && <div className={styles.sectionTitle}>Acadêmico</div>}
        
        <div className={styles.navSection}>
          <NavLink to="/materias" className={styles.navLink}>
            <span className={styles.icon}>📚</span>
            {!collapsed && <span>Matérias</span>}
          </NavLink>
        </div>

        {!collapsed && <div className={styles.sectionTitle}>Configurações</div>}
        
        <div className={styles.navSection}>
          <NavLink to="/account" className={styles.navLink}>
            <span className={styles.icon}>👤</span>
            {!collapsed && <span>Minha Conta</span>}
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}
