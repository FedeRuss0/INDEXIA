package Models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import Services.DatabaseConnection;

public class Book {
    private String title;
    private String author;
    private String ISBN;
    private int year;
    private String publisher;
    private String genre;
    private int copies;
    private int availableCopies;

    public Book(String title, String author, String iSBN, int year, String publisher, String genre, int copies,
            int availableCopies) {
        this.title = title;
        this.author = author;
        ISBN = iSBN;
        this.year = year;
        this.publisher = publisher;
        this.genre = genre;
        this.copies = copies;
        this.availableCopies = availableCopies;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String iSBN) {
        ISBN = iSBN;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public int getCopies() {
        return copies;
    }

    public void setCopies(int copies) {
        this.copies = copies;
    }

    public int getAvailableCopies() {
        return availableCopies;
    }

    public void setAvailableCopies(int availablecopies) {
        this.availableCopies = availablecopies;
    }
    
    public boolean isAvailable() {
        return availableCopies > 0;
    }

    public class BookDAO {

    // Insertar libro en la base
    public boolean addBook(Book book) {
        String sql = "INSERT INTO books (isbn, title, author, year, publisher, genre, copies, available_copies) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, book.getISBN());
            stmt.setString(2, book.getTitle());
            stmt.setString(3, book.getAuthor());
            stmt.setInt(4, book.getYear());
            stmt.setString(5, book.getPublisher());
            stmt.setString(6, book.getGenre());
            stmt.setInt(7, book.getCopies());
            stmt.setInt(8, book.getAvailableCopies());

            int rowsInserted = stmt.executeUpdate();
            return rowsInserted > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Buscar libros por palabra clave flexible
    public List<Book> searchBooks(String query) {
        List<Book> books = new ArrayList<>();
        String sql = "SELECT * FROM books WHERE LOWER(title) LIKE ? OR LOWER(author) LIKE ? OR LOWER(genre) LIKE ? OR LOWER(publisher) LIKE ?";

        String likeQuery = "%" + query.toLowerCase() + "%";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            for (int i = 1; i <= 4; i++) {
                stmt.setString(i, likeQuery);
            }

            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Book book = new Book(
                    rs.getString("title"),
                    rs.getString("author"),
                    rs.getString("isbn"),
                    rs.getInt("year"),
                    rs.getString("publisher"),
                    rs.getString("genre"),
                    rs.getInt("copies"),
                    rs.getInt("available_copies")
                );
                books.add(book);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return books;
    }
}
}
