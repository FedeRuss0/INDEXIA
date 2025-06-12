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

    // 🔹 Consultar por codigoLibro (ej: 00000001)
    @GetMapping("/{codigoLibro}")
    public ResponseEntity<Libro> verPorCodigo(@PathVariable String codigoLibro) {
        return libroService.buscarPorCodigo(codigoLibro)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear nuevo libro
    @PostMapping
    public Libro agregar(@RequestBody Libro libro) {
        return libroService.guardar(libro);
    }

    // 🔹 Actualizar por codigoLibro
    @PutMapping("/{codigoLibro}")
    public ResponseEntity<Libro> actualizar(
            @PathVariable String codigoLibro,
            @RequestBody Libro libroActualizado) {

        return libroService.actualizarPorCodigo(codigoLibro, libroActualizado)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔹 Eliminar por codigoLibro
    @DeleteMapping("/{codigoLibro}")
    public void eliminar(@PathVariable String codigoLibro) {
        libroService.eliminarPorCodigo(codigoLibro);
    }
}
