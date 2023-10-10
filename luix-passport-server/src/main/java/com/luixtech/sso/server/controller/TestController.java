package com.luixtech.sso.server.controller;


import com.luixtech.springbootframework.component.MessageCreator;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@Slf4j
@Tag(name = "测试")
public class TestController {
    private final MessageCreator messageCreator;

    @GetMapping("/api/message/message-source")
    public String message() {
        return messageCreator.getMessage("UE1002");
    }
}
