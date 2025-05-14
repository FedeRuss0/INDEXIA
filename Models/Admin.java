package Models;

import java.util.List;

public class Admin extends User {

    public Admin(String username, String password) {
        super(username, password);
    }
    
    public void addBook(List<Book> catalog, Book book) {
        catalog.add(book);
    }
}
