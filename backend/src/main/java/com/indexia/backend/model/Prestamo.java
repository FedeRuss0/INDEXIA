package com.indexia.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Usuario usuario;

    @ManyToOne
    private Libro libro;

    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    private boolean devuelto = false;

    // Nuevo: se marca cuando el bibliotecario aprueba el préstamo
    private boolean aprobado = false;

    // Nuevo: se marca cuando el cliente solicita la devolución
    private boolean solicitaDevolucion = false;
}
