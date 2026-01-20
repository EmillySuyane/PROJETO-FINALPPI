import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "./Account.module.css";

export default function Account() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("plannerUsers")) || [];
    const updatedUsers = users.map(u =>
      u.email === user.email
        ? { ...u, name: formData.name }
        : u
    );

    localStorage.setItem("plannerUsers", JSON.stringify(updatedUsers));
    const updatedUser = { ...user, name: formData.name };
    localStorage.setItem("plannerUser", JSON.stringify(updatedUser));

    window.location.reload();
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Minha Conta</h1>
      </div>

      <div className={styles.card}>
        <div className={styles.avatar}>
          {user?.name?.charAt(0)}
        </div>

        {!isEditing ? (
          <div className={styles.info}>
            <div className={styles.field}>
              <label>Nome</label>
              <p>{formData.name}</p>
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <p>{formData.email}</p>
            </div>

            <button onClick={() => setIsEditing(true)} className={styles.editBtn}>
              ✏️ Editar Perfil
            </button>
          </div>
        ) : (
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                disabled
                className={styles.input}
              />
            </div>

            <div className={styles.formButtons}>
              <button onClick={handleSave} className={styles.saveBtn}>
                💾 Salvar
              </button>
              <button onClick={() => setIsEditing(false)} className={styles.cancelBtn}>
                ❌ Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.danger}>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          🚪 Sair da Conta
        </button>
      </div>
    </div>
  );
}
