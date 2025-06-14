import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EnviarCorreo = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/usuarios/recuperar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.text();
    setMensaje(data);
  };

  return (
    <div className="contenedor-reset">
      <h2>¿Olvidaste tu contraseña?</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar enlace</button>
      </form>

      {mensaje && <p>{mensaje}</p>}

      <button onClick={() => navigate("/login")} className="login-button">
        Volver al login
      </button>
    </div>
  );
};

export default EnviarCorreo;
