interface Prestamo {
  id: number;
  usuario: { usuarioId: string; nombre: string };
  libro: { codigoLibro: string; titulo: string }; 
  fechaInicio: string;
  fechaFin: string;
}

interface Props {
  prestamos: Prestamo[];
  onAprobar: (id: number) => void;
  onRechazar: (id: number) => void;
}

const PrestamosPendientes = ({ prestamos, onAprobar, onRechazar }: Props) => (
  <div className="panel-interno">
    <h3 className="subtitulo-panel">Préstamos pendientes</h3>
    <table className="tabla">
      <thead>
        <tr>
          <th>Libro (Código)</th>
          <th>Usuario (ID)</th>
          <th>Inicio</th>
          <th>Fin</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {prestamos.map((p) => (
          <tr key={p.id}>
            <td>{p.libro.titulo} ({p.libro.codigoLibro})</td>
            <td>{p.usuario.nombre} ({p.usuario.usuarioId})</td>
            <td>{p.fechaInicio}</td>
            <td>{p.fechaFin}</td>
            <td className="tabla-acciones">
              <button className="boton-aprobar" onClick={() => onAprobar(p.id)}>
                Aprobar
              </button>
              <button className="boton-rechazar" onClick={() => onRechazar(p.id)}>
                Rechazar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PrestamosPendientes;
