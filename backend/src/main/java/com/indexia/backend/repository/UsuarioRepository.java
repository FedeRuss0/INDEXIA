package com.indexia.backend.repository;

import com.indexia.backend.model.Usuario;
import com.indexia.backend.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Para contar usuarios según su rol, usado al generar usuarioId (como A1, B1)
    long countByRol(Rol rol);

    // Muesta el usuarioId en vistas, pero no se usa en rutas
    Optional<Usuario> findByUsuarioId(String usuarioId);

    Optional<Usuario> findByEmail(String email);
}
