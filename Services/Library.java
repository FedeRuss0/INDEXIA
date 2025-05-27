package Services;

import java.util.HashMap;
import java.util.Map;

import Models.Book;
import Models.Admin;

public class Library {

    private Map<String, Book> catalog;

    public Library() {
        this.catalog = new HashMap<>();
    }

    public Map<String, Book> getCatalog() {
        return catalog;
    }

    // El admin agrega un libro al catálogo
    public void addBook(Admin admin, String title, String author, String isbn, int year, String publisher,
                        String genre, int copies, int availableCopies) {
        if (catalog.containsKey(isbn)) {
            System.out.println("El libro con ISBN " + isbn + " ya existe en el catálogo.");
            return;
        }
        Book newBook = new Book(title, author, isbn, year, publisher, genre, copies, availableCopies);
        catalog.put(isbn, newBook);
        System.out.println("Libro agregado exitosamente por admin: " + admin.getUsername());
    }

    // El admin elimina un libro del catálogo
    public void removeBook(Admin admin, String isbn) {
        if (catalog.containsKey(isbn)) {
            catalog.remove(isbn);
            System.out.println("Libro eliminado exitosamente por admin: " + admin.getUsername());
        } else {
            System.out.println("No se encontró ningún libro con ISBN: " + isbn);
        }
    }

    // El admin edita un libro existente en el catálogo
    public void editBook(Admin admin, String isbn, String newTitle, String newAuthor, Integer newYear,
                         String newPublisher, String newGenre, Integer newCopies, Integer newAvailableCopies) {
        Book book = catalog.get(isbn);
        if (book == null) {
            System.out.println("No se encontró el libro con ISBN: " + isbn);
            return;
        }

        if (newTitle != null) book.setTitle(newTitle);
        if (newAuthor != null) book.setAuthor(newAuthor);
        if (newYear != null && newYear > 0) book.setYear(newYear);
        if (newPublisher != null) book.setPublisher(newPublisher);
        if (newGenre != null) book.setGenre(newGenre);
        if (newCopies != null && newCopies >= 0) book.setCopies(newCopies);
        if (newAvailableCopies != null && newAvailableCopies >= 0) book.setAvailableCopies(newAvailableCopies);

        System.out.println("Libro editado exitosamente por admin: " + admin.getUsername());
    }

    public void showCatalog() {
        if (catalog.isEmpty()) {
            System.out.println("El catálogo está vacío.");
        } else {
            System.out.println("Catálogo de libros:");
            for (Book book : catalog.values()) {
                System.out.println("Título: " + book.getTitle() + " | Autor: " + book.getAuthor() + " | ISBN: " + book.getISBN() +
                                   " | Año: " + book.getYear() + " | Editorial: " + book.getPublisher() +
                                   " | Género: " + book.getGenre() + " | Copias: " + book.getCopies() +
                                   " | Disponibles: " + book.getAvailableCopies());
            }
        }
    }

}
