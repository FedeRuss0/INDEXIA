package com.indexia.backend.controller;

import com.indexia.backend.model.Libro;
import com.indexia.backend.service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/libros")
@CrossOrigin(origins = "http://localhost:5173")
public class LibroController {

    @Autowired
    private LibroService libroService;

    // Listar todos los libros
    @GetMapping
    public List<Libro> listar() {
        return libroService.listarTodos();
    }

    // 🔹 Consultar por ID (usado por LibroDetalle)
    @GetMapping("/id/{id}")
    public ResponseEntity<Libro> verPorId(@PathVariable Long id) {
        return libroService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear nuevo libro
    @PostMapping
    public Libro agregar(@RequestBody Libro libro) {
        return libroService.guardar(libro);
    }

    // Actualizar por ID
    @PutMapping("/{id}")
    public ResponseEntity<Libro> actualizar(
            @PathVariable Long id,
            @RequestBody Libro libroActualizado) {

        return libroService.actualizarPorId(id, libroActualizado)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Eliminar por ID
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        libroService.eliminarPorId(id);
    }
}

