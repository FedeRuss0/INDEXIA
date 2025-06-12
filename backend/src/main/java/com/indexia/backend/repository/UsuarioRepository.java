package com.indexia.backend.repository;

import com.indexia.backend.model.Usuario;
import com.indexia.backend.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    long countByRol(Rol rol);

    Optional<Usuario> findByUsuarioId(String usuarioId);
}
