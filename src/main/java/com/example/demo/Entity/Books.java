package com.example.demo.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor 
public class Books {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title; 
    private String author;
    private String isbn;
    private boolean available = true;

    @Override
    public String toString() {
        String availability = available ? "Yes" : "No";
        return "{" +
                "\n Book Name ='" + title + '\'' +
                ",\n Author of Book ='" + author + '\'' +
                ",\n ISBN ='" + isbn + '\'' +
                ",\n Available = " + availability +
                "\n}";
    }
}
