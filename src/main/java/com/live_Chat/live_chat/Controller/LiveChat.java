package com.live_Chat.live_chat.Controller;

import com.live_Chat.live_chat.DTO.ChatRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class LiveChat {
    @GetMapping("/")
    public String Demo(){
        return "home";
    }

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatRequest LiveChat(ChatRequest message){
        System.out.println(message.getContent());
        return message;
    }
}
