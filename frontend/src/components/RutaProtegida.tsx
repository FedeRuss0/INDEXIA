import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  rolPermitido: string;
}

const RutaProtegida = ({ children, rolPermitido }: Props) => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (usuario.rol !== rolPermitido) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RutaProtegida;
