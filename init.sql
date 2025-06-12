USE indexia;

-- Insertar usuarios (usuarioId como A1, B1, C1)
INSERT INTO usuario (id, usuario_id, email, nombre, password, rol) VALUES
(1, 'A1', 'admin@example.com', 'admin', 'admin', 'ADMIN'),
(2, 'B1', 'bibliotecario@example.com', 'bibliotecario', 'bibliotecario', 'BIBLIOTECARIO'),
(3, 'C1', 'cliente@example.com', 'cliente', 'cliente', 'CLIENTE');

-- Insertar libros con codigoLibro de 6 dígitos
INSERT INTO libro (codigo_libro, titulo, autor, genero, anio, isbn, disponible) VALUES
('100001', '1984', 'George Orwell', 'Distopía', 1949, '9780451524935', true),
('100002', 'El guardián entre el centeno', 'J.D. Salinger', 'Ficción', 1951, '9780316769488', true),
('100003', 'Matar a un ruiseñor', 'Harper Lee', 'Drama', 1960, '9780061120084', true),
('100004', 'El idiota', 'Fyodor Dostoyevsky', 'Filosofía', 1869, '9780140449242', true),
('100005', 'Rebelión en la granja', 'George Orwell', 'Política', 1945, '9780451526342', true),
('100006', 'El señor de las moscas', 'William Golding', 'Aventura', 1954, '9780399501487', true),
('100007', 'El código Da Vinci', 'Dan Brown', 'Misterio', 2003, '9780307474278', true),
('100008', 'El juego de Ender', 'Orson Scott Card', 'Ciencia ficción', 1985, '9780812550702', true),
('100009', 'Orgullo y prejuicio', 'Jane Austen', 'Romance', 1813, '9781503290563', true),
('100010', 'Don Quijote de la Mancha', 'Miguel de Cervantes', 'Clásico', 1605, '9780060934347', true),
('100011', 'La rebelión de Atlas', 'Ayn Rand', 'Filosofía', 1957, '9780451191144', true),
('100012', 'Nunca me abandones', 'Kazuo Ishiguro', 'Ciencia ficción', 2005, '9781400078776', true),
('100013', 'Fahrenheit 451', 'Ray Bradbury', 'Distopía', 1953, '9781451673319', true),
('100014', 'El viejo y el mar', 'Ernest Hemingway', 'Literatura', 1952, '9780684801223', true),
('100015', 'Las ventajas de ser invisible', 'Stephen Chbosky', 'Juvenil', 2000, '9781451696202', true);

