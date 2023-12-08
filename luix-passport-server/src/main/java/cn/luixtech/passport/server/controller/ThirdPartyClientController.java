package cn.luixtech.passport.server.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

import static cn.luixtech.passport.server.service.AuthorityService.*;

@Slf4j
@RestController
@AllArgsConstructor
public class ThirdPartyClientController {
    @Operation(summary = "find all authority list")
    @GetMapping("/api/third-party-clients/authorities")
    public ResponseEntity<List<String>> authorities() {
        return ResponseEntity.ok().body(Arrays.asList(AUTH_ANONYMOUS, AUTH_USER, AUTH_ADMIN, AUTH_DEVELOPER));
    }
}
