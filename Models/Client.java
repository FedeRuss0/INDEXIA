package Models;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Client extends User {
    private LocalDate registrationDate;
    private String email;
    private String phone;
    private String address;

    private List<Loan> activeLoans;
    private List<Loan> loanHistory;
    private double outstandingFines;
    private boolean isSuspended;

    private final int maxAllowedLoans = 3;

    public Client(int userId, String username, String email, String phone, String address) {
        super(userId, username);
        this.registrationDate = LocalDate.now();
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.activeLoans = new ArrayList<>();
        this.loanHistory = new ArrayList<>();
        this.outstandingFines = 0.0;
        this.isSuspended = false;
    }

    
    public LocalDate getRegistrationDate() {
        return registrationDate;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public List<Loan> getActiveLoans() {
        return activeLoans;
    }

    public List<Loan> getLoanHistory() {
        return loanHistory;
    }

    public double getOutstandingFines() {
        return outstandingFines;
    }

    public boolean isSuspended() {
        return isSuspended;
    }

    // Métodos funcionales
    public boolean canBorrow() {
        return !isSuspended && activeLoans.size() < maxAllowedLoans;
    }

    public void borrowBook(Loan loan) {
        if (!canBorrow()) {
            throw new IllegalStateException("Client cannot borrow more books.");
        }
        activeLoans.add(loan);
    }

    public void returnBook(Loan loan) {
        if (!activeLoans.contains(loan)) return;
        loan.setReturnDate(LocalDate.now());
        activeLoans.remove(loan);
        loanHistory.add(loan);

        if (loan.isOverdue()) {
            outstandingFines += loan.daysOverdue() * 500; 
        }
    }

    public void payFine(double amount) {
        if (amount <= 0) return;
        outstandingFines -= amount;
        if (outstandingFines < 0) outstandingFines = 0;
    }

    public void suspend() {
        isSuspended = true;
    }

    public void reactivate() {
        isSuspended = false;
    }

    @Override
    public String toString() {
        return "Client{" +
                "userId=" + getUserID() +
                ", username='" + getUsername() + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", activeLoans=" + activeLoans.size() +
                ", fines=" + outstandingFines +
                ", suspended=" + isSuspended +
                '}';
    }
}
