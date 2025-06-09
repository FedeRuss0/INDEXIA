import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Libro = {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  anio: number;
  isbn: string;
  disponible: boolean;
};

const ClienteSearch = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const fetchLibros = async () => {
    const res = await fetch("http://localhost:8080/libros");
    const data = await res.json();
    // Filtrar solo disponibles
    setLibros(data.filter((libro: Libro) => libro.disponible));
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  const librosFiltrados = libros.filter((libro) =>
    libro.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Buscar libros disponibles</h2>
      <input
        type="text"
        placeholder="Buscar por título"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <ul className="space-y-2">
        {librosFiltrados.map((libro) => (
          <li
            key={libro.id}
            className="border p-3 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{libro.titulo}</h3>
              <p className="text-sm text-gray-600">
                {libro.autor} — {libro.genero} ({libro.anio})
              </p>
            </div>
            <button
              onClick={() => navigate(`/cliente/libro/${libro.id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Ver más
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClienteSearch;
