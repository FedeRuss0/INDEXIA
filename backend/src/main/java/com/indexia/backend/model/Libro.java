package com.indexia.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    @Column(unique = true)
    private String codigoLibro; 

    private String titulo;
    private String autor;
    private String genero;
    private int anio;

    @Column(unique = true)
    private String isbn;

    private boolean disponible = true;

    public void generarCodigoLibro() {
        if (this.id != null) {
            this.codigoLibro = String.valueOf(100000 + this.id);
        }
    }
}
