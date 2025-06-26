package com.example.chatboot_RAG;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.chatboot_RAG.entities.Person;

public interface PersonRepository extends JpaRepository<Person, Long>, JpaSpecificationExecutor<Person> {
    // Méthodes de recherche personnalisées peuvent être ajoutées ici

}
