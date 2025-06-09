
-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS indexia;
USE indexia;

-- Usuarios base (copia exacta)
INSERT INTO usuario (id, email, nombre, password, rol) VALUES
(1, 'cliente@example.com', 'cliente', 'cliente', 'CLIENTE'),
(2, 'admin@example.com', 'admin', 'admin', 'ADMIN'),
(3, 'bibliotecario@example.com', 'bibliotecario', 'bibliotecario', 'BIBLIOTECARIO');

-- Libros (15 libros conocidos con todos los campos necesarios)
INSERT INTO libro (anio, autor, disponible, genero, isbn, titulo) VALUES
(1949, 'George Orwell', 1, 'Distopía', '9780451524935', '1984'),
(1951, 'J.D. Salinger', 1, 'Ficción', '9780316769488', 'El guardián entre el centeno'),
(1960, 'Harper Lee', 1, 'Drama', '9780061120084', 'Matar a un ruiseñor'),
(1869, 'Fyodor Dostoyevsky', 1, 'Filosofía', '9780140449242', 'El idiota'),
(1945, 'George Orwell', 1, 'Política', '9780451526342', 'Rebelión en la granja'),
(1954, 'William Golding', 1, 'Aventura', '9780399501487', 'El señor de las moscas'),
(2003, 'Dan Brown', 1, 'Misterio', '9780307474278', 'El código Da Vinci'),
(1985, 'Orson Scott Card', 1, 'Ciencia ficción', '9780812550702', 'El juego de Ender'),
(1813, 'Jane Austen', 1, 'Romance', '9781503290563', 'Orgullo y prejuicio'),
(1605, 'Miguel de Cervantes', 1, 'Clásico', '9780060934347', 'Don Quijote de la Mancha'),
(1957, 'Ayn Rand', 1, 'Filosofía', '9780451191144', 'La rebelión de Atlas'),
(2005, 'Kazuo Ishiguro', 1, 'Ciencia ficción', '9781400078776', 'Nunca me abandones'),
(1953, 'Ray Bradbury', 1, 'Distopía', '9781451673319', 'Fahrenheit 451'),
(1952, 'Ernest Hemingway', 1, 'Literatura', '9780684801223', 'El viejo y el mar'),
(2000, 'Stephen Chbosky', 1, 'Juvenil', '9781451696202', 'Las ventajas de ser invisible');
