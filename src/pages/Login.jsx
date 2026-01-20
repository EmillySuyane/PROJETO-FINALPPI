import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const res = login(email, password);

    if (res.error) {
      setError(res.error);
    } else {
      navigate("/");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formBox + " fadeIn"}>
        <h1 className={styles.title}>Entrar</h1>

        {error && <p style={{ color: "#d64545" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Senha</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className={styles.button}>Entrar</button>
        </form>

        <p className={styles.link}>
          Não tem conta?{" "}
          <Link to="/register">
            <span>Criar agora</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
