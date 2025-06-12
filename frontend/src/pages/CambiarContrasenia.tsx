import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CambiarContrasenia = () => {
  const [email, setEmail] = useState("");
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");

    try {
      const usuarioStr = localStorage.getItem("usuario");
      if (!usuarioStr) {
        setMensaje("No hay sesión activa");
        return;
      }

      const usuario = JSON.parse(usuarioStr);

      if (email !== usuario.email) {
        setMensaje("El email no coincide con el usuario logueado");
        return;
      }

      if (actual !== usuario.password) {
        setMensaje("Contraseña actual incorrecta");
        return;
      }

      const actualizado = {
        id: usuario.id, // clave primaria
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        password: nueva,
        usuarioId: usuario.usuarioId, // nombre correcto del campo
      };

      const response = await fetch(`http://localhost:8080/usuarios/${usuario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actualizado),
      });

      if (!response.ok) {
        setMensaje("Error al actualizar la contraseña en el servidor");
        return;
      }

      localStorage.setItem("usuario", JSON.stringify(actualizado));
      setMensaje("Contraseña actualizada correctamente");

      setTimeout(() => {
        navigate(-1);
      }, 1500);

    } catch (err) {
      console.error(err);
      setMensaje("Error al actualizar la contraseña");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Contraseña actual"
          value={actual}
          onChange={(e) => setActual(e.target.value)}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">
          Actualizar
        </button>
      </form>

      {mensaje && (
        <p className={`login-feedback ${mensaje.includes("correctamente") ? "success" : "error"}`}>
          {mensaje}
        </p>
      )}

      <div className="login-extra-links">
        <button
          className="login-secondary-button"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default CambiarContrasenia;
