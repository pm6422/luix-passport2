package cn.luixtech.passport.server.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import static cn.luixtech.passport.server.config.AuthorizationServerConfiguration.DEFAULT_PASSWORD_ENCODER_PREFIX;
import static cn.luixtech.passport.server.service.impl.UserServiceImpl.BCRYPT_PASSWORD_ENCODER;

@RestController
public class TestController {
    @Operation(summary = "get encoded password")
    @GetMapping("/api/test/encode-password/{rawPassword}")
    public Map<String, String> encodePassword(@Parameter(description = "Raw password", required = true) @PathVariable String rawPassword) {
        return Map.of("encodedPassword", DEFAULT_PASSWORD_ENCODER_PREFIX + BCRYPT_PASSWORD_ENCODER.encode(rawPassword));
    }
}
