package DAO;

import Models.Book;
import Services.DatabaseConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class BookDAO {

    public void insert(Book book) throws SQLException {
        String sql = "INSERT INTO books (title, author, isbn, year, publisher, genre, copies, available_copies) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
             
            ps.setString(1, book.getTitle());
            ps.setString(2, book.getAuthor());
            ps.setString(3, book.getISBN());
            ps.setInt(4, book.getYear());
            ps.setString(5, book.getPublisher());
            ps.setString(6, book.getGenre());
            ps.setInt(7, book.getCopies());
            ps.setInt(8, book.getAvailableCopies());
            
            ps.executeUpdate();
        }
    }

    public void update(Book book) throws SQLException {
        String sql = "UPDATE books SET title=?, author=?, year=?, publisher=?, genre=?, copies=?, available_copies=? WHERE isbn=?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
             
            ps.setString(1, book.getTitle());
            ps.setString(2, book.getAuthor());
            ps.setInt(3, book.getYear());
            ps.setString(4, book.getPublisher());
            ps.setString(5, book.getGenre());
            ps.setInt(6, book.getCopies());
            ps.setInt(7, book.getAvailableCopies());
            ps.setString(8, book.getISBN());
            
            ps.executeUpdate();
        }
    }

    public void delete(String isbn) throws SQLException {
        String sql = "DELETE FROM books WHERE isbn=?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
             
            ps.setString(1, isbn);
            ps.executeUpdate();
        }
    }

    public Book findByISBN(String isbn) throws SQLException {
        String sql = "SELECT * FROM books WHERE isbn=?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
             
            ps.setString(1, isbn);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return mapRowToBook(rs);
            }
        }
        return null;
    }

    public List<Book> search(String keyword) throws SQLException {
        String sql = "SELECT * FROM books WHERE LOWER(title) LIKE ? OR LOWER(author) LIKE ? OR LOWER(isbn) LIKE ? OR LOWER(publisher) LIKE ? OR LOWER(genre) LIKE ?";
        List<Book> results = new ArrayList<>();
        String searchTerm = "%" + keyword.toLowerCase() + "%";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
             
            for (int i = 1; i <= 5; i++) {
                ps.setString(i, searchTerm);
            }
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                results.add(mapRowToBook(rs));
            }
        }
        return results;
    }

    private Book mapRowToBook(ResultSet rs) throws SQLException {
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
        return book;
    }
}

