import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebaseConfig";
import Login from "./components/Login";
import FormularioFuncionario from "./components/FormularioFuncionario";
import ListaFuncionarios from "./components/ListaFuncionarios";
import AtualizarFuncionario from "./components/AtualizarFuncionario";
import HistoricoFuncionario from "./components/HistoricoFuncionario"; // Importando o componente
import "./styles/App.scss";


// Componente para proteger as rotas
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ListaFuncionarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lista-funcionarios"
          element={
            <ProtectedRoute>
              <ListaFuncionarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cadastrar"
          element={
            <ProtectedRoute>
              <FormularioFuncionario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/atualizar/:id"
          element={
            <ProtectedRoute>
              <AtualizarFuncionario />
            </ProtectedRoute>
          }
        />
        {/* Adicionando a rota para visualizar o histórico do funcionário */}
        <Route
          path="/historico/:id"
          element={
            <ProtectedRoute>
              <HistoricoFuncionario />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;







