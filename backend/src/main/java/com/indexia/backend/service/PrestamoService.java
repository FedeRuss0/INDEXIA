package com.indexia.backend.service;

import com.indexia.backend.model.Libro;
import com.indexia.backend.model.Prestamo;
import com.indexia.backend.model.Usuario;
import com.indexia.backend.repository.LibroRepository;
import com.indexia.backend.repository.PrestamoRepository;
import com.indexia.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PrestamoService {

    @Autowired
    private PrestamoRepository prestamoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private LibroRepository libroRepository;

    public Prestamo solicitarPrestamo(Prestamo prestamo) {
        Usuario usuario = usuarioRepository.findById(prestamo.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Libro libro = libroRepository.findById(prestamo.getLibro().getId())
                .orElseThrow(() -> new RuntimeException("Libro no encontrado"));

        if (!libro.isDisponible()) {
            throw new RuntimeException("El libro no está disponible para préstamo");
        }

        prestamo.setUsuario(usuario);
        prestamo.setLibro(libro);
        prestamo.setFechaInicio(LocalDate.now());
        prestamo.setFechaFin(LocalDate.now().plusDays(7));
        prestamo.setDevuelto(false);
        prestamo.setAprobado(false);
        prestamo.setSolicitaDevolucion(false);

        return prestamoRepository.save(prestamo);
    }

    public Prestamo aceptarPrestamo(Long id) {
        Prestamo prestamo = prestamoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Préstamo no encontrado"));

        Libro libro = prestamo.getLibro();
        if (!libro.isDisponible()) {
            throw new RuntimeException("El libro ya no está disponible");
        }

        libro.setDisponible(false);
        libroRepository.save(libro);

        prestamo.setAprobado(true);
        return prestamoRepository.save(prestamo);
    }

    public Prestamo solicitarDevolucion(Long id) {
        Prestamo prestamo = prestamoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Préstamo no encontrado"));

        prestamo.setSolicitaDevolucion(true);
        return prestamoRepository.save(prestamo);
    }

    public Prestamo aceptarDevolucion(Long id) {
        Prestamo prestamo = prestamoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Préstamo no encontrado"));

        Libro libro = prestamo.getLibro();
        libro.setDisponible(true);
        libroRepository.save(libro);

        prestamoRepository.deleteById(id);
        return prestamo;
    }

    public void rechazarPrestamo(Long id) {
        if (!prestamoRepository.existsById(id)) {
            throw new RuntimeException("Préstamo no encontrado");
        }
        prestamoRepository.deleteById(id);
    }

    public List<Prestamo> obtenerTodosLosPrestamos() {
        return prestamoRepository.findAll();
    }

    public void eliminarPrestamo(Long id) {
        prestamoRepository.deleteById(id);
    }
}

