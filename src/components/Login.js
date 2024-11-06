import React, { useState } from "react";
import { auth } from "../services/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar entre login e registro
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login", error);
      alert("Falha ao fazer login. Verifique as credenciais.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Erro ao registrar usuário", error);
      alert("Erro ao registrar. Verifique as informações.");
    }
  };

  return (
    <div>
      <h2>{isRegistering ? "Registrar" : "Login"}</h2>
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <button type="submit">{isRegistering ? "Registrar" : "Entrar"}</button>
      </form>

      {/* Botão para alternar entre login e registro */}
      <p>
        {isRegistering ? "Já tem uma conta?" : "Não tem uma conta?"}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Fazer Login" : "Registrar"}
        </button>
      </p>
    </div>
  );
};

export default Login;

