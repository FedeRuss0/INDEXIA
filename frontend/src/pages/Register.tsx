import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      const response = await fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          email,
          password,
          rol: 'CLIENTE'
        }),
      });

      if (response.ok) {
        setMensaje('Registro exitoso. Te enviamos un correo para verificar tu cuenta.');
      } else {
        const data = await response.json();
        setError(data.message || 'Error al registrarse');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Registro</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="login-input"
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">
          Registrarse
        </button>
        {error && <p className="login-error">{error}</p>}
        {mensaje && <p className="login-success">{mensaje}</p>}
      </form>

      <div className="login-extra-links">
        <Link to="/login" className="login-secondary-button">
          Volver al login
        </Link>
      </div>
    </div>
  );
};

export default Register;

