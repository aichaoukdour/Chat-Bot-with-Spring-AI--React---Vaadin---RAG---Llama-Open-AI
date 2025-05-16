package com.example.chatboot_RAG.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chatboot_RAG.services.ChatAiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/chat")
public class ChatRestController {

    private ChatAiService chatAiService;

    public ChatRestController(ChatAiService chatAiService) {
        this.chatAiService = chatAiService;
    }

    @GetMapping("/ask")
    public String ask(String question) {
        return chatAiService.ragChat(question);
    }
    
}
