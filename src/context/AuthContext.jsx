import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("plannerUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem("plannerUsers")) || [];
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      return { error: "Email ou senha inválidos" };
    }

    localStorage.setItem("plannerUser", JSON.stringify(found));
    setUser(found);
    return { success: true };
  }

  function register(name, email, password) {
    const users = JSON.parse(localStorage.getItem("plannerUsers")) || [];

    if (users.find((u) => u.email === email)) {
      return { error: "Esse email já está cadastrado" };
    }

    const newUser = { name, email, password };
    users.push(newUser);

    localStorage.setItem("plannerUsers", JSON.stringify(users));
    localStorage.setItem("plannerUser", JSON.stringify(newUser));

    setUser(newUser);
    return { success: true };
  }

  function logout() {
    localStorage.removeItem("plannerUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* hook bonitinho pra usar no app */
export function useAuth() {
  return useContext(AuthContext);
}
