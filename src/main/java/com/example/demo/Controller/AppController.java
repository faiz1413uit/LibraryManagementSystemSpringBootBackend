package com.example.demo.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.Books;
import com.example.demo.Service.BooksService;

@RestController
@RequestMapping("/books") // Using a more standard API path
public class AppController {

    @Autowired
    BooksService booksService;

    // GET /api/books/available - Fetches all available books
    @GetMapping("/")
    public ResponseEntity<List<Books>> fetchAvailableBooks() {
        List<Books> books = booksService.getAvailableBooks();
        return ResponseEntity.ok(books); // Returns a proper JSON array
    }

    // POST /api/books - Adds a new book
    @PostMapping
    public String insertBook(@RequestBody Books book) {
    	if(book.getTitle().equals(""))
    	{
    		return "Title Can Not Be Empty" ;
    	}
    	else if(book.getIsbn().equals(""))
    	{
    		return "Isbn can not be Empty" ;
    	}
    	else if(book.getAuthor().equals("")) {
    		return "Author Name Can not Be Empty" ;
    	}
    	
    	Optional<Books> b= booksService.searchByBookTitle(book.getTitle());
    	if(b.isPresent())
    	{
    		return "Book Already Present , Can not Add It";
    	}
        booksService.addBook(book);
        return "Book Successfully Added"; 
    }

    // PUT /books/borrow/{BookName} - Borrows a book by its name
    @PutMapping("/borrow/{title}")
    public ResponseEntity<String> borrowBook(@PathVariable String title) {
        Optional<Books> book = booksService.borrowBook(title);
        if (book.isPresent()) {
            return ResponseEntity.ok("Book with Title " + title + " borrowed successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found or is not available to borrow.");
        }
    }

    // PUT /books/return/{Book Name} - Returns a book by its Name
    @PutMapping("/return/{title}")
    public ResponseEntity<String> returnBook(@PathVariable String title) {
        Optional<Books> book = booksService.returnBook(title);
        if (book.isPresent()) {
            return ResponseEntity.ok("Book with ID " + title + " returned successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found or was already returned.");
        }
    }
    
    @PutMapping("/search/{name}")
    public String Search(@PathVariable String name)
    {
    	if(name.equals(""))
    	{
    		return "Enter A Valid Name Please";
    	}
    	Optional<Books> Allbook = booksService.searchByBookTitle(name);
    	Books book;
    	if(Allbook.isPresent())
    	{
    		book = Allbook.get();
    		return book.toString();
    	}
    	else
    	{
    		List<Books> books = booksService.searchByAuthorName(name);
    		if(!books.isEmpty())
    		{
    			StringBuilder response= new StringBuilder("");
    			for(Books b : books)
    			{
    				response.append(b.toString() + ",\n");
    			}
    			return response.toString();
    		}
    		else {
    			return "Book Not Found";
    		}
    	}
    }
}
