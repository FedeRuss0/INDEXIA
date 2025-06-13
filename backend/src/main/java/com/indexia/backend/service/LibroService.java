package com.indexia.backend.service;

import com.indexia.backend.model.Libro;
import com.indexia.backend.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.List;
import java.util.Optional;

@Service
public class LibroService {

    @Autowired
    private LibroRepository libroRepository;

    public Libro guardar(Libro libro) {
        int anioActual = Year.now().getValue();
        if (libro.getAnio() > anioActual) {
            throw new IllegalArgumentException("El año del libro no puede ser mayor al actual.");
        }

        // Primer guardado: se genera el ID
        Libro guardado = libroRepository.saveAndFlush(libro);

        // Generar codigoLibro basado en ID
        guardado.generarCodigoLibro();

        // Segundo guardado: persiste el codigoLibro
        return libroRepository.save(guardado);
    }

    public List<Libro> listarTodos() {
        return libroRepository.findAll();
    }

    public Optional<Libro> buscarPorId(Long id) {
        return libroRepository.findById(id);
    }

    public Optional<Libro> actualizarPorId(Long id, Libro libroActualizado) {
        int anioActual = Year.now().getValue();
        if (libroActualizado.getAnio() > anioActual) {
            throw new IllegalArgumentException("El año del libro no puede ser mayor al actual.");
        }

        return libroRepository.findById(id).map(libro -> {
            libro.setTitulo(libroActualizado.getTitulo());
            libro.setAutor(libroActualizado.getAutor());
            libro.setGenero(libroActualizado.getGenero());
            libro.setAnio(libroActualizado.getAnio());
            libro.setIsbn(libroActualizado.getIsbn());
            libro.setDisponible(libroActualizado.isDisponible());
            return libroRepository.save(libro);
        });
    }

    public void eliminarPorId(Long id) {
        libroRepository.findById(id)
                .ifPresent(libroRepository::delete);
    }
}
