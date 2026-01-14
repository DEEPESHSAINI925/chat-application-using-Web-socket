package com.live_Chat.live_chat.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {
    private String sender ;
    private String content;
    private MessageType type ;
    private String timeStamp ;


}
