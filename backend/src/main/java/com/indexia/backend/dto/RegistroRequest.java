package com.indexia.backend.dto;

import com.indexia.backend.model.Rol;
import lombok.Data;

@Data
public class RegistroRequest {
    private String nombre;
    private String email;
    private String password;
    private Rol rol; // ADMIN, CLIENTE, BIBLIOTECARIO
}
