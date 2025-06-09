import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PrestamosPendientes from "../components/PrestamosPendientes";
import DevolucionesPendientes from "../components/DevolucionesPendientes";

interface Prestamo {
  id: number;
  usuario: { id: number; nombre: string };
  libro: { id: number; titulo: string };
  fechaInicio: string;
  fechaFin: string;
  aprobado: boolean;
  devuelto: boolean;
  solicitaDevolucion: boolean;
}

const BibliotecarioHome = () => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [mensaje, setMensaje] = useState("");

  const fetchPrestamos = async () => {
    const res = await fetch("http://localhost:8080/prestamos");
    const data = await res.json();
    setPrestamos(data);
  };

  useEffect(() => {
    fetchPrestamos();
  }, []);

  const aprobarPrestamo = async (id: number) => {
    await fetch(`http://localhost:8080/prestamos/aceptar/${id}`, {
      method: "PUT",
    });
    setMensaje("Préstamo aprobado correctamente");
    fetchPrestamos();
  };

  const rechazarPrestamo = async (id: number) => {
    await fetch(`http://localhost:8080/prestamos/${id}`, {
      method: "DELETE",
    });
    setMensaje("Préstamo rechazado correctamente");
    fetchPrestamos();
  };

  const confirmarDevolucion = async (id: number) => {
    await fetch(`http://localhost:8080/prestamos/aceptar-devolucion/${id}`, {
      method: "PUT",
    });
    setMensaje("Devolución confirmada correctamente");
    fetchPrestamos();
  };

  const prestamosPendientes = prestamos.filter((p) => !p.aprobado);
  const devolucionesPendientes = prestamos.filter(
    (p) => p.aprobado && p.solicitaDevolucion && !p.devuelto
  );

  return (
    <>
      <Navbar />
      <div className="bibliotecario-home">
        <h2 className="titulo-seccion">Panel del Bibliotecario</h2>

        {mensaje && <div className="mensaje-exito">{mensaje}</div>}

        <div className="seccion-panel">
          <PrestamosPendientes
            prestamos={prestamosPendientes}
            onAprobar={aprobarPrestamo}
            onRechazar={rechazarPrestamo}
          />
        </div>

        <div className="seccion-panel">
          <DevolucionesPendientes
            prestamos={devolucionesPendientes}
            onConfirmar={confirmarDevolucion}
          />
        </div>
      </div>
    </>
  );
};

export default BibliotecarioHome;
