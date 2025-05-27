package Models;

public class Admin extends User {

    public Admin(int userId, String username) {
        super(userId, username);
    }

    public Admin(String username, String password, String email) {
            super(username, password, email, "admin");
        }
}
