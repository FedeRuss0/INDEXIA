package com.indexia.backend.controller;

import com.indexia.backend.model.Usuario;
import com.indexia.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return usuarioService.guardar(usuario);
    }

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.listarTodos();
    }

    // 🔹 Buscar por usuarioId (ej: A1)
    @GetMapping("/{usuarioId}")
    public ResponseEntity<Usuario> obtenerPorUsuarioId(@PathVariable String usuarioId) {
        return usuarioService.buscarPorUsuarioId(usuarioId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔹 Actualizar por usuarioId
    @PutMapping("/{usuarioId}")
    public ResponseEntity<Usuario> actualizarUsuario(
            @PathVariable String usuarioId,
            @RequestBody Usuario usuarioActualizado) {

        return usuarioService.actualizarPorUsuarioId(usuarioId, usuarioActualizado)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔹 Eliminar por usuarioId
    @DeleteMapping("/{usuarioId}")
    public void eliminarUsuario(@PathVariable String usuarioId) {
        usuarioService.eliminarPorUsuarioId(usuarioId);
    }
}
