import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerificarCuenta = () => {
  const { token } = useParams();
  const [mensaje, setMensaje] = useState("Verificando...");
  const [estado, setEstado] = useState<"ok" | "error" | "info">("info");
  const navigate = useNavigate();

  useEffect(() => {
    const verificar = async () => {
      if (!token) {
        setMensaje("Token no proporcionado.");
        setEstado("error");
        return;
      }

      try {
        // Ruta corregida
        const res = await fetch(`http://localhost:8080/verificar?token=${token}`);
        const texto = await res.text();

        if (res.ok) {
          setMensaje(texto);
          setEstado("ok");
        } else {
          setMensaje(texto || "Token inválido.");
          setEstado("error");
        }
      } catch (err) {
        setMensaje("Ocurrió un error al verificar la cuenta.");
        setEstado("error");
      }
    };

    verificar();
  }, [token]);

  return (
    <div className="verificacion-container">
      <h2 className={`verificacion-mensaje ${estado}`}>
        {mensaje}
      </h2>
      {estado === "ok" && (
        <button onClick={() => navigate("/login")} className="login-button">
          Ir al inicio de sesión
        </button>
      )}
    </div>
  );
};

export default VerificarCuenta;
