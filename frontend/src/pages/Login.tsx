import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/usuarios");
      const usuarios = await response.json();

      const user = usuarios.find(
        (u: any) => u.email === email && u.password === password
      );

      if (user) {
        if (!user.verificado) {
          setError("Tu cuenta aún no fue verificada. Revisá tu correo.");
          return;
        }

        const datosUsuario = {
          id: user.id,
          usuarioId: user.usuarioId,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol,
          password: user.password,
        };

        localStorage.setItem("usuario", JSON.stringify(datosUsuario));

        switch (user.rol) {
          case "ADMIN":
            navigate("/admin");
            break;
          case "BIBLIOTECARIO":
            navigate("/bibliotecario");
            break;
          case "CLIENTE":
            navigate("/cliente");
            break;
          default:
            setError("Rol no reconocido");
        }
      } else {
        setError("Credenciales inválidas");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar sesión</h2>
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
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">
          Entrar
        </button>
        {error && <p className="login-error">{error}</p>}
      </form>

      <div className="login-extra-links">
        <Link to="/register" className="login-secondary-button">
          Registrate acá
        </Link>
        <Link to="/recuperar" className="login-secondary-button">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </div>
  );
};

export default Login;
