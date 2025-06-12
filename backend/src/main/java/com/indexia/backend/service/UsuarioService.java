package com.indexia.backend.service;

import com.indexia.backend.model.Rol;
import com.indexia.backend.model.Usuario;
import com.indexia.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Crear usuario con usuarioId tipo A1, B1, C1
    public Usuario guardar(Usuario usuario) {
        String prefijo = obtenerPrefijo(usuario.getRol());
        long secuencia = usuarioRepository.countByRol(usuario.getRol()) + 1;
        usuario.generarUsuarioId(prefijo, secuencia);
        return usuarioRepository.save(usuario);
    }

    // Listar todos los usuarios
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    // 🔹 Buscar por usuarioId
    public Optional<Usuario> buscarPorUsuarioId(String usuarioId) {
        return usuarioRepository.findByUsuarioId(usuarioId);
    }

    // 🔹 Actualizar por usuarioId
    public Optional<Usuario> actualizarPorUsuarioId(String usuarioId, Usuario datosActualizados) {
        return usuarioRepository.findByUsuarioId(usuarioId).map(usuario -> {
            usuario.setNombre(datosActualizados.getNombre());
            usuario.setEmail(datosActualizados.getEmail());
            usuario.setRol(datosActualizados.getRol());

            if (datosActualizados.getPassword() != null && !datosActualizados.getPassword().isEmpty()) {
                usuario.setPassword(datosActualizados.getPassword());
            }

            return usuarioRepository.save(usuario);
        });
    }

    // 🔹 Eliminar por usuarioId
    public void eliminarPorUsuarioId(String usuarioId) {
        usuarioRepository.findByUsuarioId(usuarioId)
                .ifPresent(usuarioRepository::delete);
    }

    // Obtener prefijo por rol
    private String obtenerPrefijo(Rol rol) {
        return switch (rol) {
            case ADMIN -> "A";
            case BIBLIOTECARIO -> "B";
            case CLIENTE -> "C";
        };
    }
}
