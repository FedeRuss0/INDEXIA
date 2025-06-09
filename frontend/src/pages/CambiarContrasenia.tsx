import { useState } from "react";
import { Link } from "react-router-dom";

const CambiarContrasenia = () => {
  const [email, setEmail] = useState("");
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await fetch("http://localhost:8080/usuarios");
      const usuarios = await res.json();
      const user = usuarios.find(
        (u: any) => u.email === email && u.password === actual
      );

      if (!user) return setMensaje("Email o contraseña actual incorrectos");

      const actualizado = { ...user, password: nueva };

      await fetch(`http://localhost:8080/usuarios/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actualizado),
      });

      setMensaje("Contraseña actualizada correctamente");
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

      {mensaje && <p className="login-feedback">{mensaje}</p>}

      <div className="login-extra-links">
        <Link to="/login" className="login-secondary-button">
          Volver al login
        </Link>
      </div>
    </div>
  );
};

export default CambiarContrasenia;
