package com.indexia.backend.controller;

import com.indexia.backend.model.Prestamo;
import com.indexia.backend.service.PrestamoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prestamos")
public class PrestamoController {

    @Autowired
    private PrestamoService prestamoService;

    @PostMapping
    public ResponseEntity<Prestamo> solicitarPrestamo(@RequestBody Prestamo prestamo) {
        Prestamo nuevo = prestamoService.solicitarPrestamo(prestamo);
        return ResponseEntity.status(201).body(nuevo);
    }

    @PutMapping("/aceptar/{id}")
    public ResponseEntity<Prestamo> aceptarPrestamo(@PathVariable Long id) {
        Prestamo actualizado = prestamoService.aceptarPrestamo(id);
        return ResponseEntity.ok(actualizado);
    }

    @PutMapping("/devolver/{id}")
    public ResponseEntity<Prestamo> solicitarDevolucion(@PathVariable Long id) {
        Prestamo actualizado = prestamoService.solicitarDevolucion(id);
        return ResponseEntity.ok(actualizado);
    }

    @PutMapping("/aceptar-devolucion/{id}")
    public ResponseEntity<Prestamo> aceptarDevolucion(@PathVariable Long id) {
        Prestamo actualizado = prestamoService.aceptarDevolucion(id);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/rechazar/{id}")
    public ResponseEntity<Void> rechazarPrestamo(@PathVariable Long id) {
        prestamoService.rechazarPrestamo(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<Prestamo> listarPrestamos() {
        return prestamoService.obtenerTodosLosPrestamos();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPrestamo(@PathVariable Long id) {
        prestamoService.eliminarPrestamo(id);
        return ResponseEntity.noContent().build();
    }
}

