package com.example.chatboot_RAG.services;

import java.util.List;
import java.util.Map;
import org.springframework.ai.document.Document;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

@Service
@BrowserCallable
@AnonymousAllowed
public class ChatAiService {
    
    private final ChatClient chatClient;
    private final VectorStore vectorStore;
    
    @Value("classpath:/prompts/prompt-template.st")
    private Resource promptResource;
    
    public ChatAiService(ChatClient.Builder builder, VectorStore vectorStore) {
        this.chatClient = builder.build();
        this.vectorStore = vectorStore;
    }
    
    public String ragChat(String question) {
        // Recherche de documents similaires
        List<Document> documents = vectorStore.similaritySearch(question);
        
        // SOLUTION 1: Essayez getText() au lieu de getContent()
        List<String> context = documents.stream()
                .map(Document::getText)  // ✅ Changement ici
                .toList();
        
        /* SOLUTION 2: Si getText() ne fonctionne pas, essayez:
        List<String> context = documents.stream()
                .map(doc -> doc.getContent())  // Appel explicite
                .toList();
        */
        
        /* SOLUTION 3: Si les solutions précédentes échouent:
        List<String> context = documents.stream()
                .map(doc -> doc.toString())  // En dernier recours
                .toList();
        */
        
        // Création du prompt avec template
        PromptTemplate promptTemplate = new PromptTemplate(promptResource);
        Prompt prompt = promptTemplate.create(
                Map.of("context", context, "question", question)
        );
        
        // Appel au modèle de chat
        return chatClient.prompt(prompt)
                .call()
                .content();
    }
}