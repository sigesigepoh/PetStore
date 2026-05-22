package com.example.petstore.controller;

import com.example.petstore.model.Pet;
import com.example.petstore.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "*") 
public class PetController {

    @Autowired
    private PetRepository petRepository;

    @GetMapping
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    @PostMapping
    public Pet createPet(@RequestBody Pet pet) {
        return petRepository.save(pet);
    }

    @PutMapping("/{id}")
    public Pet updatePet(@PathVariable Long id, @RequestBody Pet petDetails) {
        Pet pet = petRepository.findById(id).orElseThrow();
        pet.setName(petDetails.getName());
        pet.setSpecies(petDetails.getSpecies());
        pet.setPrice(petDetails.getPrice());
        pet.setImageUrl(petDetails.getImageUrl());
        return petRepository.save(pet);
    }

    @DeleteMapping("/{id}")
    public void deletePet(@PathVariable Long id) {
        petRepository.deleteById(id);
    }
}