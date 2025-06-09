import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  anio: number;
  isbn: string;
  disponible: boolean;
}

const LibroDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const [libro, setLibro] = useState<Libro | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const res = await fetch(`http://localhost:8080/libros/${id}`);
        if (!res.ok) throw new Error("No se pudo obtener el libro");
        const data = await res.json();
        setLibro(data);
      } catch (err) {
        setError("Error al cargar el libro");
        console.error(err);
      }
    };

    fetchLibro();
  }, [id]);

  const solicitarPrestamo = async () => {
    if (!libro || !usuario) return;

    const hoy = new Date().toISOString().split("T")[0];
    const fin = new Date();
    fin.setDate(fin.getDate() + 7);
    const fechaFin = fin.toISOString().split("T")[0];

    const prestamo = {
      usuario: { id: usuario.id },
      libro: { id: libro.id },
      fechaInicio: hoy,
      fechaFin,
      devuelto: false,
    };

    try {
      await fetch("http://localhost:8080/prestamos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prestamo),
      });

      alert("Préstamo solicitado con éxito");
      navigate("/cliente");
    } catch (err) {
      console.error(err);
      alert("Error al solicitar préstamo");
    }
  };

  if (error) return <p className="libro-error">{error}</p>;
  if (!libro) return <p className="libro-cargando">Cargando libro...</p>;

  return (
    <div className="libro-detalle-container">
      <h2 className="libro-titulo">{libro.titulo}</h2>
      <p><strong>Autor:</strong> {libro.autor}</p>
      <p><strong>Género:</strong> {libro.genero}</p>
      <p><strong>Año:</strong> {libro.anio}</p>
      <p><strong>ISBN:</strong> {libro.isbn}</p>
      <p>
        <strong>Disponible:</strong>{" "}
        <span className={libro.disponible ? "disponible" : "no-disponible"}>
          {libro.disponible ? "Sí" : "No"}
        </span>
      </p>

      {libro.disponible && (
        <button onClick={solicitarPrestamo} className="boton-prestamo">
          Solicitar préstamo
        </button>
      )}

      <button
  onClick={() => navigate("/cliente")}
  className="boton-volver"
>
  ← Volver
</button>
    </div>
  );
};

export default LibroDetalle;
