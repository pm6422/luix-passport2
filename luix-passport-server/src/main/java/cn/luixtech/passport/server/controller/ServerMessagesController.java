package cn.luixtech.passport.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServerMessagesController {

    @GetMapping("/api/server-messages")
    public String[] getMessages() {
        return new String[]{"Message 1", "Message 2"};
    }
}
