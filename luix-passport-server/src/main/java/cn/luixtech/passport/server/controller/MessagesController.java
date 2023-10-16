package cn.luixtech.passport.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessagesController {

    @GetMapping("/api/messages")
    public String[] getMessages() {
        return new String[]{"Auth Server Message 1", "Auth Server Message 2"};
    }
}
