interface Prestamo {
  id: number;
  usuario: { usuarioId: string; nombre: string };
  libro: { codigoLibro: string; titulo: string }; // ← agregado codigoLibro
  fechaInicio: string;
  fechaFin: string;
}

interface Props {
  prestamos: Prestamo[];
  onConfirmar: (id: number) => void;
}

const DevolucionesPendientes = ({ prestamos, onConfirmar }: Props) => (
  <div className="panel-interno">
    <h3 className="subtitulo-panel">Devoluciones pendientes</h3>
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
              <button
                className="boton-confirmar"
                onClick={() => onConfirmar(p.id)}
              >
                Confirmar devolución
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DevolucionesPendientes;
