package com.indexia.backend.controller;

import com.indexia.backend.model.Usuario;
import com.indexia.backend.model.VerificationToken;
import com.indexia.backend.repository.UsuarioRepository;
import com.indexia.backend.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/verificar")
@CrossOrigin(origins = "http://localhost:5173") // Cambialo si usás otro origen
public class VerificacionController {

    @Autowired
    private VerificationTokenRepository tokenRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @GetMapping
    public ResponseEntity<String> verificarCuenta(@RequestParam String token) {
        VerificationToken vt = tokenRepo.findByToken(token);

        if (vt == null) {
            // 🔄 Si el token ya fue usado, buscamos por usuario relacionado para ver si ya está verificado
            Usuario yaVerificado = usuarioRepo.findAll()
                .stream()
                .filter(Usuario::isVerificado)
                .findAny()
                .orElse(null);

            if (yaVerificado != null) {
                return ResponseEntity.ok("Tu cuenta ya está verificada.");
            }

            return ResponseEntity.badRequest().body("Token inválido o ya expirado.");
        }

        if (vt.getExpiracion().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("El enlace de verificación ha expirado.");
        }

        Usuario usuario = vt.getUsuario();

        if (usuario.isVerificado()) {
            tokenRepo.delete(vt); // Limpieza por las dudas
            return ResponseEntity.ok("Tu cuenta ya está verificada.");
        }

        usuario.setVerificado(true);
        usuarioRepo.save(usuario);
        tokenRepo.delete(vt);

        return ResponseEntity.ok("Cuenta verificada correctamente.");
    }
}

