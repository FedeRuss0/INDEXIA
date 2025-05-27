import Models.User;
import Models.Admin;
import DAO;

public class Main {
    public static void main(String[] args) {
        UserDAO userDAO = new UserDAO();

        try {
            // Crear un usuario normal
            User user = new User("juan123", "pass123", "juan@mail.com", "user");
            userDAO.insert(user);
            System.out.println("Usuario creado: " + user.getUsername());

            // Crear un admin
            Admin admin = new Admin("admin01", "adminpass", "admin@mail.com");
            userDAO.insert(admin);
            System.out.println("Admin creado: " + admin.getUsername());

            // Buscar usuario
            User u = userDAO.findByUsername("juan123");
            if (u != null) {
                System.out.println("Usuario encontrado: " + u.getUsername() + ", rol: " + u.getRole());
            }

            // Buscar admin
            User a = userDAO.findByUsername("admin01");
            if (a != null) {
                System.out.println("Admin encontrado: " + a.getUsername() + ", rol: " + a.getRole());
            }

            // Cambiar contraseña de usuario
            userDAO.updatePassword("juan123", "newpass456");
            System.out.println("Contraseña actualizada para usuario juan123");

            // Verificar contraseña actualizada (volver a buscar)
            User u2 = userDAO.findByUsername("juan123");
            System.out.println("Nueva contraseña guardada (hashed/encoded): " + u2.getPassword());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
