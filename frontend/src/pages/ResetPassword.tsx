import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [nuevaContrasenia, setNuevaContrasenia] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/usuarios/resetear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, nuevaContrasenia }),
    });

    const data = await res.text();
    setMensaje(data);
  };

  return (
    <div className="contenedor-reset">
      <h2>Restablecer contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={nuevaContrasenia}
          onChange={(e) => setNuevaContrasenia(e.target.value)}
          required
        />
        <button type="submit">Actualizar</button>
      </form>

      {mensaje && (
        <div className="reset-mensaje">
          <p>{mensaje}</p>
          {mensaje.includes("éxito") && (
            <button className="reset-login-button" onClick={() => navigate("/login")}>
              Ir al login
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
