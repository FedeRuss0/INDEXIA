import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      try {
        const usuario = JSON.parse(usuarioGuardado);
        setNombre(usuario.nombre || "");
      } catch (e) {
        console.error("Error al leer el usuario", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-section navbar-left">
        <span className="usuario-nombre">Bienvenido{nombre ? `, ${nombre}` : ""}</span>
      </div>
      <div className="navbar-section navbar-center">
        <span className="navbar-title">INDEXIA</span>
      </div>
      <div className="navbar-section navbar-right">
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
