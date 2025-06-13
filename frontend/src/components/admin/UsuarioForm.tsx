import type { Usuario } from "../../types/Usuario";

interface Props {
  form: Usuario;
  setForm: React.Dispatch<React.SetStateAction<Usuario>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  modoEditar: boolean;
}

const UsuarioForm = ({ form, setForm, onSubmit, modoEditar }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, verificado: e.target.checked }));
  };

  return (
    <form onSubmit={onSubmit} className="form-admin">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
      />
      <select
        name="rol"
        value={form.rol}
        onChange={handleChange}
      >
        <option value="ADMIN">Admin</option>
        <option value="BIBLIOTECARIO">Bibliotecario</option>
        <option value="CLIENTE">Cliente</option>
      </select>

      {modoEditar && (
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="verificado"
            checked={form.verificado || false}
            onChange={handleCheckboxChange}
          />
          Verificado
        </label>
      )}

      <button type="submit" className="boton-form">
        {modoEditar ? "Guardar cambios" : "Crear usuario"}
      </button>
    </form>
  );
};

export default UsuarioForm;
