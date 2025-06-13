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
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Verificado</th> {/* Nueva columna */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios
            .filter((usuario) => usuario.usuarioId)
            .map((usuario) => (
              <tr key={usuario.usuarioId}>
                <td>{usuario.usuarioId}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
                <td>{usuario.verificado ? "Sí" : "No"}</td> {/* Nueva celda */}
                <td className="acciones-columna">
                  <button
                    onClick={() => onEditar(usuario)}
                    className="boton-amarillo"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(usuario.id!)}
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

