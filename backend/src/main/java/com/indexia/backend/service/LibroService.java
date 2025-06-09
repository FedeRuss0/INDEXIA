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

    public Libro guardar(Libro libro) {
        return libroRepository.save(libro);
    }

    public List<Libro> listarTodos() {
        return libroRepository.findAll();
    }

    public Optional<Libro> buscarPorId(Long id) {
        return libroRepository.findById(id);
    }

    public void eliminar(Long id) {
        libroRepository.deleteById(id);
    }

    public Libro actualizar(Long id, Libro libroActualizado) {
        Optional<Libro> existente = libroRepository.findById(id);
        if (existente.isPresent()) {
            Libro libro = existente.get();
            libro.setTitulo(libroActualizado.getTitulo());
            libro.setAutor(libroActualizado.getAutor());
            libro.setGenero(libroActualizado.getGenero());
            libro.setAnio(libroActualizado.getAnio());
            libro.setIsbn(libroActualizado.getIsbn());
            libro.setDisponible(libroActualizado.isDisponible());
            return libroRepository.save(libro);
        } else {
            return null;
        }
    }
}
