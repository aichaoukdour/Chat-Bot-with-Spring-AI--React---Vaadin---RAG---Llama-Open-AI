package com.example.chatboot_RAG.web;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

@RestController
public class TestController {
    private final RestClient restClient;

    public TestController(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.baseUrl("http://localhost:11434").build();
    }

    @GetMapping("/test-ollama")
    public String testOllama() {
        try {
            String response = restClient.get()
                .uri("/api/ps")
                .retrieve()
                .body(String.class);
            return "Ollama response: " + response;
        } catch (Exception e) {
            return "Error connecting to Ollama: " + e.getMessage();
        }
    }
}