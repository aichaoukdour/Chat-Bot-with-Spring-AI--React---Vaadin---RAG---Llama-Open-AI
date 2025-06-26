package com.example.chatboot_RAG;

import java.util.UUID;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.chatboot_RAG.entities.Person;
import com.example.chatboot_RAG.PersonRepository; // Add this import

@SpringBootApplication
public class ChatbootRagApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChatbootRagApplication.class, args);
    }

    @Bean // Add this annotation
    CommandLineRunner commandLineRunner(PersonRepository personRepository) {
        return args -> {
            for(int i = 0; i < 100; i++) {
                Person person = Person.builder()
                        .name(UUID.randomUUID().toString().substring(0, 8))
                        .email(UUID.randomUUID().toString().substring(0, 8) + "@example.com")
                        .build();
                personRepository.save(person);
            }
        };
    }
}