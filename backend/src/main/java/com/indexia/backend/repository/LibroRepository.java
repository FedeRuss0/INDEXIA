package com.indexia.backend.repository;

import com.indexia.backend.model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LibroRepository extends JpaRepository<Libro, Long> {
    Optional<Libro> findByCodigoLibro(String codigoLibro);
}
