import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const res = register(name, email, password);

    if (res.error) {
      setError(res.error);
    } else {
      navigate("/login");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formBox + " fadeIn"}>
        <h1 className={styles.title}>Criar conta</h1>

        {error && <p style={{ color: "#d64545" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Nome</label>
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <button className={styles.button}>Cadastrar</button>
        </form>

        <p className={styles.link}>
          Já tem conta?{" "}
          <Link to="/login">
            <span>Entrar</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
