import type { Usuario } from "../../types/Usuario";

interface Props {
  usuarios: Usuario[];
  onEditar: (usuario: Usuario) => void;
  onDelete: (id: number) => void;
}

const UsuarioList = ({ usuarios, onEditar, onDelete }: Props) => {
  return (
    <div className="tabla-contenedor">
      <h3 className="seccion-subtitulo">Usuarios registrados</h3>
      <table className="tabla-admin">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td className="acciones-columna">
                <button
                  onClick={() => onEditar(usuario)}
                  className="boton-amarillo"
                >
                  Editar
                </button>
                <button
                  onClick={() => usuario.id !== undefined && onDelete(usuario.id)}
                  className="boton-rojo"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuarioList;
