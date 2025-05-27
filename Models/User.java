package Models;

public abstract class User {
    protected String username;
    protected String password;
    protected static int userID;
    
    public User(String username, String password, int userID) {
        this.username = username;
        this.password = password;
        User.userID = userID;

    }
    public User(int userId2, String username2) {
        
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public int getUserID() {
        return userID;
    }
    public void setUserID(int userID) {
        User.userID = userID;
    }

    public boolean changePassword(String currentPassword, String newPassword) {
        if (!this.password.equals(currentPassword)) {
            System.out.println("Contraseña actual incorrecta.");
            return false;
        }
        if (newPassword == null || newPassword.isEmpty()) {
            System.out.println("Nueva contraseña inválida.");
            return false;
        }
        this.password = newPassword;
        System.out.println("Contraseña cambiada exitosamente.");
        return true;
    }
}
