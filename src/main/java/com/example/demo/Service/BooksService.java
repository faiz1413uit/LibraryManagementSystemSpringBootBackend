package com.example.demo.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Entity.Books;
import com.example.demo.Repository.LibraryRepo;

@Service
public class BooksService {

    @Autowired
    LibraryRepo libraryRepo;

    public Books addBook(Books book) {
        return libraryRepo.save(book);
    }

    public Optional<Books> searchByBookTitle(String title) {
        return libraryRepo.findByTitleIgnoreCase(title);
    }
    
    //Search By the Name of Book
    public List<Books> searchByAuthorName(String author) {
        return libraryRepo.findByAuthorIgnoreCase(author);
    }
    
    //Search By the Name of Book Author
    public List<Books> getAvailableBooks() {
        return libraryRepo.findByAvailable(true);
    }

    // --- LOGIC FOR BORROWING AND RETURNING ---

    public Optional<Books> borrowBook(String title) {
        // Find the book by its unique ID
        Optional<Books> bookOptional = libraryRepo.findByTitleIgnoreCase(title);
        if (bookOptional.isPresent()) {
            Books book = bookOptional.get();
            // Check if it's available
            if (book.isAvailable()) {
                book.setAvailable(false); // Set to not available
                libraryRepo.save(book);   // Save the change to the database
                return Optional.of(book);
            }
        }
        return Optional.empty(); // Return empty if not found or not available
    }

    public Optional<Books> returnBook(String title) {
        Optional<Books> bookOptional = libraryRepo.findByTitleIgnoreCase(title);
        if (bookOptional.isPresent()) {
            Books book = bookOptional.get();
            // Check if it's already returned
            if (!book.isAvailable()) {
                book.setAvailable(true); // Set to available
                libraryRepo.save(book);  // Save the change
                return Optional.of(book);
            }
        }
        return Optional.empty();
    }
}
