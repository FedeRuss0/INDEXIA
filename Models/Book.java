package Models; 

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
}
