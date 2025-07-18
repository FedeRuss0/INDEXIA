import React from "react";
import type { Libro } from "../../types/Libro";

type Props = {
  form: Libro;
  setForm: React.Dispatch<React.SetStateAction<Libro>>;
  onSubmit: (e: React.FormEvent) => void;
  modoEditar: boolean;
};

const LibroForm: React.FC<Props> = ({ form, setForm, onSubmit, modoEditar }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev: Libro) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "anio"
          ? parseInt(value) || 0
          : value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="form-admin">
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={form.titulo}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="autor"
        placeholder="Autor"
        value={form.autor}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="genero"
        placeholder="Género"
        value={form.genero}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="anio"
        placeholder="Año"
        value={form.anio === 0 ? "" : form.anio}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="isbn"
        placeholder="ISBN"
        value={form.isbn}
        onChange={handleChange}
        required
      />
      <label className="checkbox-line">
        <input
          type="checkbox"
          name="disponible"
          checked={form.disponible}
          onChange={handleChange}
        />
        Disponible
      </label>
      <button type="submit" className="boton-form">
        {modoEditar ? "Guardar cambios" : "Agregar libro"}
      </button>
    </form>
  );
};

export default LibroForm;
