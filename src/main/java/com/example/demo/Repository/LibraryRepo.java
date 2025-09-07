package com.example.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.Entity.Books;

@Repository
public interface LibraryRepo extends CrudRepository<Books, Long> {

    Optional<Books> findByTitleIgnoreCase(String title);

    List<Books> findByAuthorIgnoreCase(String author);
    
    List<Books> findByAvailable(boolean available);
    
}
