import { useEffect, useState } from "react";

interface Prestamo {
  id: number;
  usuario: { id: number; nombre: string };
  libro: { titulo: string };
  fechaInicio: string;
  fechaFin: string;
  aprobado: boolean;
  devuelto: boolean;
  solicitaDevolucion: boolean;
}

const MisPrestamos = () => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  const fetchPrestamos = async () => {
    const res = await fetch("http://localhost:8080/prestamos");
    const data = await res.json();
    const filtrados = data.filter(
      (p: Prestamo) =>
        p.usuario?.id === usuario?.id && p.aprobado && !p.devuelto
    );
    setPrestamos(filtrados);
  };

  useEffect(() => {
    fetchPrestamos();
  }, []);

  const solicitarDevolucion = async (id: number) => {
    await fetch(`http://localhost:8080/prestamos/devolver/${id}`, {
      method: "PUT",
    });
    fetchPrestamos();
  };

  return (
    <div className="mis-prestamos">
      <h2 className="titulo-seccion">Mis Préstamos</h2>
      {prestamos.length === 0 ? (
        <p className="mensaje-vacio">No tenés préstamos activos.</p>
      ) : (
        <div className="lista-prestamos">
          {prestamos.map((p) => (
            <div key={p.id} className="item-prestamo">
              <div className="info-prestamo">
                <h3 className="titulo-libro">{p.libro.titulo}</h3>
                <p className="detalle-prestamo">Inicio: {p.fechaInicio}</p>
                <p className="detalle-prestamo">Fin: {p.fechaFin}</p>
                <p className="estado-prestamo">
                  {p.solicitaDevolucion
                    ? "Solicitud de devolución enviada"
                    : "Préstamo activo"}
                </p>
              </div>
              {!p.solicitaDevolucion && (
                <button
                  onClick={() => solicitarDevolucion(p.id)}
                  className="boton-devolucion"
                >
                  Solicitar devolución
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisPrestamos;
