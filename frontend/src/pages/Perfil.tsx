import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Usuario } from "../types/Usuario";

const Perfil = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (!data) {
      navigate("/login");
      return;
    }
    try {
      const parsed = JSON.parse(data);
      setUsuario(parsed);
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  if (!usuario) return null;

  return (
    <div className="pagina-perfil">
      <h2>Perfil del Usuario</h2>
      <div className="perfil-info">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>
        <p><strong>ID:</strong> {usuario.usuarioId}</p>
      </div>

      <div className="botones-perfil">
        <button
          className="boton-cambiar"
          onClick={() => navigate("/cambiar-contrasenia")}
        >
          Cambiar contraseña
        </button>
        <button
          className="boton-volver"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default Perfil;

