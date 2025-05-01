package com.example.chatboot_RAG.services;

import java.lang.module.ModuleDescriptor.Builder;

import org.springframework.stereotype.Service;

@Service
public class ChatAiService {

    private ChatClient chatClient;

    public ChatAiService(ChatClient.Builder builder){
        this.chatClient = Builder.build();
    }

}
