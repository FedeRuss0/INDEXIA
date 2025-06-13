package com.indexia.backend.controller;

import com.indexia.backend.model.Usuario;
import com.indexia.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(
            @PathVariable Long id,
            @RequestBody Usuario usuarioActualizado) {

        return usuarioService.actualizarPorId(id, usuarioActualizado)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarPorId(id);
    }

    // Recuperar contraseña (envía el correo)
    @PostMapping("/recuperar")
    public ResponseEntity<String> recuperar(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        try {
            usuarioService.enviarLinkRecuperacion(email);
            return ResponseEntity.ok("Correo de recuperación enviado.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // Restablecer contraseña usando token
    @PostMapping("/resetear")
    public ResponseEntity<String> resetear(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String nuevaContrasenia = request.get("nuevaContrasenia");

        boolean exito = usuarioService.resetearContrasenia(token, nuevaContrasenia);
        if (exito) {
            return ResponseEntity.ok("Contraseña actualizada con éxito.");
        } else {
            return ResponseEntity.badRequest().body("Token inválido o expirado.");
        }
    }
}
