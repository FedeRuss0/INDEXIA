// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminHome from "./pages/AdminHome";
import BibliotecarioHome from "./pages/BibliotecarioHome";
import ClienteHome from "./pages/ClienteHome";
import RutaProtegida from "./components/RutaProtegida";
import LibroDetalle from "./pages/cliente/LibroDetalle"; 
import CambiarContrasenia from "./pages/CambiarContrasenia";
import Perfil from "./pages/Perfil";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cliente/libro/:id" element={<LibroDetalle />} />
        <Route path="/cambiar-contrasenia" element={<CambiarContrasenia />} />
        <Route path="/perfil" element={<RutaProtegida><Perfil /></RutaProtegida>} />


        <Route
          path="/admin"
          element={
            <RutaProtegida rolPermitido="ADMIN">
              <AdminHome />
            </RutaProtegida>
          }
        />
        <Route
          path="/bibliotecario"
          element={
            <RutaProtegida rolPermitido="BIBLIOTECARIO">
              <BibliotecarioHome />
            </RutaProtegida>
          }
        />
        <Route
          path="/cliente"
          element={
            <RutaProtegida rolPermitido="CLIENTE">
              <ClienteHome />
            </RutaProtegida>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


