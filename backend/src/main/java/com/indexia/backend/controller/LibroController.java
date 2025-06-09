package com.indexia.backend.controller;

import com.indexia.backend.model.Libro;
import com.indexia.backend.service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/libros")
public class LibroController {

    @Autowired
    private LibroService libroService;

    @GetMapping
    public List<Libro> listar() {
        return libroService.listarTodos();
    }

    @GetMapping("/{id}")
    public Libro ver(@PathVariable Long id) {
        return libroService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Libro agregar(@RequestBody Libro libro) {
        return libroService.guardar(libro);
    }

    @PutMapping("/{id}")
    public Libro actualizar(@PathVariable Long id, @RequestBody Libro libroActualizado) {
        return libroService.actualizar(id, libroActualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        libroService.eliminar(id);
    }
}
