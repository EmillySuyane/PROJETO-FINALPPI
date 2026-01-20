import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "./UserMenu.module.css";

export default function UserMenu() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleAccount = () => {
    navigate("/account");
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => setOpen(!open)} className={styles.avatar}>
        {user?.name?.charAt(0)}
      </button>

      {open && (
        <div className={styles.dropdown}>
          <p className={styles.name}>{user?.name}</p>
          <p className={styles.email}>{user?.email}</p>

          <hr />

          <button onClick={handleAccount} className={styles.btn}>
            ⚙️ Minha conta
          </button>
          <button onClick={handleLogout} className={styles.logout}>
            🚪 Sair
          </button>
        </div>
      )}
    </div>
  );
}
