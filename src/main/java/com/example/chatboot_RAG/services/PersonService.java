package com.example.chatboot_RAG.services;

import org.checkerframework.checker.units.qual.A;
import org.springframework.stereotype.Service;

import com.example.chatboot_RAG.PersonRepository;
import com.example.chatboot_RAG.entities.Person;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;



@Service
@BrowserCallable
@AnonymousAllowed
public class PersonService extends CrudRepositoryService<Person, Long, PersonRepository> {

  

    
}
