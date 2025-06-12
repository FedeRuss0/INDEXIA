import type { Usuario } from "../../types/Usuario";

interface Props {
  usuarios: Usuario[];
  onEditar: (usuario: Usuario) => void;
  onDelete: (usuarioId: string) => void;
}

const UsuarioList = ({ usuarios, onEditar, onDelete }: Props) => {
  return (
    <div className="tabla-contenedor">
      <h3 className="seccion-subtitulo">Usuarios registrados</h3>
      <table className="tabla-admin">
        <thead>
          <tr>
            <th>ID</th> {/* Nueva columna */}
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios
            .filter((usuario) => usuario.usuarioId)
            .map((usuario) => (
              <tr key={usuario.usuarioId}>
                <td>{usuario.usuarioId}</td> {/* Nueva celda */}
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
                    onClick={() => onDelete(usuario.usuarioId!)}
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
