import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import UserMenu from "../pages/UserMenu";
import ThemeToggle from "../pages/ThemeToggle";
import styles from "./Layout.module.css";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <Sidebar collapsed={collapsed} />

      <div className={styles.main}>
        <div className={styles.topbar}>
          <div className={styles.left}>
            <button
              className={styles.menuBtn}
              onClick={() => setCollapsed(!collapsed)}
            >
              ☰
            </button>
            <h2>Planner</h2>
          </div>

          <div className={styles.right}>
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>

        <div className={styles.subbar}>
          <button
            className={styles.backBtn}
            onClick={() => navigate(-1)}
            title="Voltar"
          >
            ← Voltar
          </button>
        </div>

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
