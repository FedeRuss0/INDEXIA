import { useEffect, useState } from "react";
import LibroForm from "./LibroForm";
import LibroList from "./LibroList";
import UsuarioForm from "./UsuarioForm";
import UsuarioList from "./UsuarioList";
import type { Libro } from "../../types/Libro";
import type { Usuario } from "../../types/Usuario";



const AdminPanel = () => {
  // CRUD Libros
  const [libros, setLibros] = useState<Libro[]>([]);
  const [formLibro, setFormLibro] = useState<Libro>({
    titulo: "",
    autor: "",
    genero: "",
    anio: new Date().getFullYear(),
    isbn: "",
    disponible: true,
  });
  const [modoEditarLibro, setModoEditarLibro] = useState(false);
  const [codigoLibroEditando, setCodigoLibroEditando] = useState<string | null>(null); // CAMBIO

  const fetchLibros = async () => {
    const res = await fetch("http://localhost:8080/libros");
    const data = await res.json();
    setLibros(data);
  };

  const handleSubmitLibro = async (e: React.FormEvent) => {
    e.preventDefault();

    const libroAEnviar = modoEditarLibro
      ? { ...formLibro, codigoLibro: codigoLibroEditando }
      : formLibro;

    const url = modoEditarLibro
      ? `http://localhost:8080/libros/${codigoLibroEditando}`
      : "http://localhost:8080/libros";
    const method = modoEditarLibro ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(libroAEnviar),
    });

    setFormLibro({
      titulo: "",
      autor: "",
      genero: "",
      anio: new Date().getFullYear(),
      isbn: "",
      disponible: true,
    });
    setModoEditarLibro(false);
    setCodigoLibroEditando(null);
    fetchLibros();
  };

  const handleDeleteLibro = async (codigoLibro: string) => {
    await fetch(`http://localhost:8080/libros/${codigoLibro}`, { method: "DELETE" });
    fetchLibros();
  };

  const handleEditLibro = (libro: Libro) => {
    setFormLibro(libro);
    setModoEditarLibro(true);
    setCodigoLibroEditando(libro.codigoLibro || null);
  };

  // CRUD Usuarios
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [formUsuario, setFormUsuario] = useState<Usuario>({
    nombre: "",
    email: "",
    password: "",
    rol: "CLIENTE",
  });
  const [modoEditarUsuario, setModoEditarUsuario] = useState(false);
  const [usuarioIdEditando, setUsuarioIdEditando] = useState<string | null>(null); // CAMBIO

  const fetchUsuarios = async () => {
    const res = await fetch("http://localhost:8080/usuarios");
    const data = await res.json();
    setUsuarios(data);
  };

  const handleSubmitUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = modoEditarUsuario
      ? `http://localhost:8080/usuarios/${usuarioIdEditando}`
      : "http://localhost:8080/usuarios";
    const method = modoEditarUsuario ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formUsuario),
    });

    setFormUsuario({
      nombre: "",
      email: "",
      password: "",
      rol: "CLIENTE",
    });
    setModoEditarUsuario(false);
    setUsuarioIdEditando(null);
    fetchUsuarios();
  };

  const handleDeleteUsuario = async (usuarioId: string) => {
    await fetch(`http://localhost:8080/usuarios/${usuarioId}`, { method: "DELETE" });
    fetchUsuarios();
  };

  const handleEditUsuario = (usuario: Usuario) => {
    setFormUsuario(usuario);
    setModoEditarUsuario(true);
    setUsuarioIdEditando(usuario.usuarioId || null); // CAMBIO
  };

  useEffect(() => {
    fetchLibros();
    fetchUsuarios();
  }, []);

  return (
    <div className="admin-panel-container">
      <section className="admin-section">
        <h2 className="admin-section-title">Gestión de Libros</h2>
        <LibroForm
          form={formLibro}
          setForm={setFormLibro}
          onSubmit={handleSubmitLibro}
          modoEditar={modoEditarLibro}
        />
        <LibroList
          libros={libros}
          onEdit={handleEditLibro}
          onDelete={handleDeleteLibro}
        />
      </section>

      <section className="admin-section">
        <h2 className="admin-section-title">Gestión de Usuarios</h2>
        <UsuarioForm
          form={formUsuario}
          setForm={setFormUsuario}
          onSubmit={handleSubmitUsuario}
          modoEditar={modoEditarUsuario}
        />
        <UsuarioList
          usuarios={usuarios}
          onEditar={handleEditUsuario}
          onDelete={handleDeleteUsuario}
        />
      </section>
    </div>
  );
};

export default AdminPanel;
