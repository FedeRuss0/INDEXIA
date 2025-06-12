package com.indexia.backend.service;

import com.indexia.backend.model.Libro;
import com.indexia.backend.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibroService {

    @Autowired
    private LibroRepository libroRepository;

    // Crear libro con codigoLibro tipo 00000001
    public Libro guardar(Libro libro) {
        // Primer guardado: genera el ID
        Libro guardado = libroRepository.save(libro);

        // Asigna el codigoLibro basado en el ID
        guardado.generarCodigoLibro();

        // Segundo guardado: guarda con codigoLibro
        return libroRepository.save(guardado);
    }

    // Listar todos
    public List<Libro> listarTodos() {
        return libroRepository.findAll();
    }

    // 🔹 Buscar por códigoLibro (nuevo ID visible)
    public Optional<Libro> buscarPorCodigo(String codigoLibro) {
        return libroRepository.findByCodigoLibro(codigoLibro);
    }

    // 🔹 Actualizar por códigoLibro
    public Optional<Libro> actualizarPorCodigo(String codigoLibro, Libro libroActualizado) {
        return libroRepository.findByCodigoLibro(codigoLibro).map(libro -> {
            libro.setTitulo(libroActualizado.getTitulo());
            libro.setAutor(libroActualizado.getAutor());
            libro.setGenero(libroActualizado.getGenero());
            libro.setAnio(libroActualizado.getAnio());
            libro.setIsbn(libroActualizado.getIsbn());
            libro.setDisponible(libroActualizado.isDisponible());
            return libroRepository.save(libro);
        });
    }

    // 🔹 Eliminar por códigoLibro
    public void eliminarPorCodigo(String codigoLibro) {
        libroRepository.findByCodigoLibro(codigoLibro)
                .ifPresent(libroRepository::delete);
    }
}
