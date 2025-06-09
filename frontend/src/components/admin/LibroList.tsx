type Libro = {
  id?: number;
  titulo: string;
  autor: string;
  genero: string;
  anio: number;
  isbn: string;
  disponible: boolean;
};

type Props = {
  libros: Libro[];
  onEdit: (libro: Libro) => void;
  onDelete: (id: number) => void;
};

const LibroList = ({ libros, onEdit, onDelete }: Props) => {
  return (
    <div className="lista-admin">
      {libros.map((libro) => (
        <div key={libro.id} className="item-admin">
          <div className="item-info">
            <p><strong>Título:</strong> {libro.titulo}</p>
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
          </div>
          <div className="admin-botones">
            <button className="boton-editar" onClick={() => onEdit(libro)}>
              Editar
            </button>
            <button className="boton-eliminar" onClick={() => onDelete(libro.id!)}>
              Borrar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LibroList;
