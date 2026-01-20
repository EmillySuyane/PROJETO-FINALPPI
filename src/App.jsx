import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Layout from "./layout/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Agenda from "./pages/Agenda";
import Kanban from "./pages/Kanban";
import Notes from "./pages/Notes";
import Materias from "./pages/Materias";
import Account from "./pages/Account";
import ThemeToggle from "./pages/ThemeToggle";

export default function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <Routes>
      {/* PÚBLICAS */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/dashboard" />}
      />

      {/* PRIVADAS */}
      <Route
        path="/"
        element={user ? <Layout /> : <Navigate to="/login" />}
      >
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="agenda" element={<Agenda />} />
        <Route path="kanban" element={<Kanban />} />
        <Route path="notes" element={<Notes />} />
        <Route path="materias" element={<Materias />} />
        <Route path="account" element={<Account />} />
        <Route path="theme" element={<ThemeToggle />} />
      </Route>
    </Routes>
  );
}
