import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import MisPrestamos from "../components/cliente/MisPrestamos";

interface Libro {
  id: number; //  clave usada en rutas
  codigoLibro: string; //  identificador visible
  titulo: string;
  autor: string;
  disponible: boolean;
}

const ClienteHome = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const librosPorPagina = 5;

  const fetchLibros = async () => {
    const res = await fetch("http://localhost:8080/libros");
    const data = await res.json();
    setLibros(data);
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  const librosFiltrados = libros.filter(
    (libro) =>
      libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      libro.autor.toLowerCase().includes(busqueda.toLowerCase())
  );

  const indexInicio = (paginaActual - 1) * librosPorPagina;
  const librosPagina = librosFiltrados.slice(indexInicio, indexInicio + librosPorPagina);
  const totalPaginas = Math.ceil(librosFiltrados.length / librosPorPagina);

  const cambiarPagina = (nueva: number) => {
    if (nueva >= 1 && nueva <= totalPaginas) setPaginaActual(nueva);
  };

  return (
    <>
      <Navbar />
      <div className="cliente-home-container">
        <div className="seccion-catalogo">
          <h2 className="titulo-seccion">Catálogo de Libros</h2>

          <input
            type="text"
            placeholder="Buscar por título o autor..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="buscador"
          />

          <ul className="lista-libros">
            {librosPagina.map((libro) => (
              <li key={libro.id} className="item-libro">
                <div>
                  <h3 className="titulo-libro">{libro.titulo}</h3>
                  <p className="autor-libro">Autor: {libro.autor}</p>
                  <p className={libro.disponible ? "disponible" : "no-disponible"}>
                    {libro.disponible ? "Disponible" : "No disponible"}
                  </p>
                </div>
                <Link to={`/cliente/libro/${libro.id}`} className="boton-vermas">
                  Ver más
                </Link>
              </li>
            ))}
          </ul>

          <div className="paginacion">
            <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
              Anterior
            </button>
            <span>
              Página {paginaActual} de {totalPaginas}
            </span>
            <button
              onClick={() => cambiarPagina(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
            >
              Siguiente
            </button>
          </div>
        </div>

        <div className="seccion-prestamos">
          <MisPrestamos />
        </div>
      </div>
    </>
  );
};

export default ClienteHome;
