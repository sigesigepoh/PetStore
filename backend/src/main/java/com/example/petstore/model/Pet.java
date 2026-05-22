package com.example.petstore.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "pets")
@Data
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String species;
    private Double price;
    
    // 📝 ADD THIS LINE BELOW
    private String description;
    
    private String imageUrl;
}