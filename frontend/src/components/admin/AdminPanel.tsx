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
  const [mensajeErrorLibro, setMensajeErrorLibro] = useState<string | null>(null); // Nuevo estado

  const fetchLibros = async () => {
    const res = await fetch("http://localhost:8080/libros");
    const data = await res.json();
    setLibros(data);
  };

  const handleSubmitLibro = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeErrorLibro(null); // Limpiar mensaje previo

    const url = modoEditarLibro && formLibro.id
      ? `http://localhost:8080/libros/${formLibro.id}`
      : "http://localhost:8080/libros";
    const method = modoEditarLibro ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formLibro),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al guardar el libro");
      }

      setFormLibro({
        titulo: "",
        autor: "",
        genero: "",
        anio: new Date().getFullYear(),
        isbn: "",
        disponible: true,
      });
      setModoEditarLibro(false);
      fetchLibros();
    } catch (err: any) {
      setMensajeErrorLibro(err.message || "Error inesperado");
    }
  };

  const handleDeleteLibro = async (id: number) => {
    await fetch(`http://localhost:8080/libros/${id}`, { method: "DELETE" });
    fetchLibros();
  };

  const handleEditLibro = (libro: Libro) => {
    setFormLibro(libro);
    setModoEditarLibro(true);
    setMensajeErrorLibro(null);
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
  const [usuarioIdEditando, setUsuarioIdEditando] = useState<string | null>(null);

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
    setUsuarioIdEditando(usuario.usuarioId || null);
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
        {mensajeErrorLibro && (
          <p className="error-libro">{mensajeErrorLibro}</p>
        )}
        <LibroList
          libros={libros}
          onEdit={handleEditLibro}
          onDelete={(libroId) => handleDeleteLibro(libroId)}
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
