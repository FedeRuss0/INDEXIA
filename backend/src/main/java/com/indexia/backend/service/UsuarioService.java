package com.indexia.backend.service;

import com.indexia.backend.model.*;
import com.indexia.backend.repository.UsuarioRepository;
import com.indexia.backend.repository.VerificationTokenRepository;
import com.indexia.backend.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private EmailService emailService;

    public Usuario guardar(Usuario usuario) {
        String prefijo = obtenerPrefijo(usuario.getRol());
        long secuencia = usuarioRepository.countByRol(usuario.getRol()) + 1;
        usuario.generarUsuarioId(prefijo, secuencia);

        if (usuario.getRol() == Rol.CLIENTE) {
            usuario.setVerificado(false);
        } else {
            usuario.setVerificado(true);
        }

        Usuario guardado = usuarioRepository.save(usuario);

        if (usuario.getRol() == Rol.CLIENTE) {
            generarYEnviarTokenVerificacion(guardado);
        }

        return guardado;
    }

    private void generarYEnviarTokenVerificacion(Usuario usuario) {
        String token = UUID.randomUUID().toString();
        LocalDateTime expiracion = LocalDateTime.now().plusHours(24);

        VerificationToken verificationToken = VerificationToken.builder()
            .token(token)
            .expiracion(expiracion)
            .usuario(usuario)
            .build();

        tokenRepository.save(verificationToken);

        String link = "http://localhost:5173/verificar/" + token;
        String asunto = "Verificá tu cuenta en INDEXIA";
        String cuerpo = "Hola " + usuario.getNombre() + ",\n\nPor favor verificá tu cuenta haciendo clic en el siguiente enlace:\n" + link + "\n\nEste enlace expira en 24 horas.";

        emailService.enviarCorreo(usuario.getEmail(), asunto, cuerpo);
    }

    // Enviar correo de recuperación
    public void enviarLinkRecuperacion(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("No se encontró una cuenta válida con ese correo."));

        if (usuario.getRol() != Rol.CLIENTE) {
            throw new RuntimeException("Solo los clientes pueden recuperar su contraseña.");
        }

        String token = UUID.randomUUID().toString();
        LocalDateTime expiracion = LocalDateTime.now().plusHours(1);

        PasswordResetToken resetToken = PasswordResetToken.builder()
            .token(token)
            .expiracion(expiracion)
            .usuario(usuario)
            .build();

        passwordResetTokenRepository.save(resetToken);

        String link = "http://localhost:5173/resetear/" + token;
        String asunto = "Restablecé tu contraseña en INDEXIA";
        String cuerpo = "Hola " + usuario.getNombre() + ",\n\nHacé clic en el siguiente enlace para cambiar tu contraseña:\n" + link + "\n\nEste enlace expira en 1 hora.";

        emailService.enviarCorreo(email, asunto, cuerpo);
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> actualizarPorId(Long id, Usuario datosActualizados) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNombre(datosActualizados.getNombre());
            usuario.setEmail(datosActualizados.getEmail());
            usuario.setRol(datosActualizados.getRol());
            usuario.setVerificado(datosActualizados.isVerificado());

            if (datosActualizados.getPassword() != null && !datosActualizados.getPassword().isEmpty()) {
                usuario.setPassword(datosActualizados.getPassword());
            }

            return usuarioRepository.save(usuario);
        });
    }

    public void eliminarPorId(Long id) {
        usuarioRepository.findById(id)
            .ifPresent(usuarioRepository::delete);
    }

    private String obtenerPrefijo(Rol rol) {
        return switch (rol) {
            case ADMIN -> "A";
            case BIBLIOTECARIO -> "B";
            case CLIENTE -> "C";
        };
    }

    //método para resetear la contraseña usando un token
    public boolean resetearContrasenia(String token, String nuevaContrasenia) {
        Optional<PasswordResetToken> optionalToken = passwordResetTokenRepository.findByToken(token);

        if (optionalToken.isEmpty()) return false;

        PasswordResetToken prt = optionalToken.get();

        if (prt.getExpiracion().isBefore(LocalDateTime.now())) {
            passwordResetTokenRepository.delete(prt); // limpieza
            return false;
        }

        Usuario usuario = prt.getUsuario();
        usuario.setPassword(nuevaContrasenia); // En producción, encriptá esto con BCrypt
        usuarioRepository.save(usuario);

        passwordResetTokenRepository.delete(prt); // uso único

        return true;
    }

    //Actualizar estado de verificación
    public Optional<Usuario> actualizarVerificacion(Long id, boolean verificado) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setVerificado(verificado);
            return usuarioRepository.save(usuario);
        });
    }
}
