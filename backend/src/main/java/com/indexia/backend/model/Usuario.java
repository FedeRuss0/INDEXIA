package com.indexia.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    @Column(unique = true, updatable = false)
    private String usuarioId; // A1, B1, C1...

    public void generarUsuarioId(String prefijo, long secuencia) {
        this.usuarioId = prefijo + secuencia;
    }
}
