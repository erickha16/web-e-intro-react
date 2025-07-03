import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Por favor ingresa un nombre de usuario");
      return;
    }
    onLogin(username);
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h1>Iniciar sesión en Twitter Clone</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
          className="auth-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="auth-button">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};