package cn.luixtech.passport.server.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

import static cn.luixtech.passport.server.service.AuthorityService.*;

@Slf4j
@RestController
@AllArgsConstructor
@PreAuthorize("hasAuthority(\"" + USER + "\")")
public class UserAuthorityController {
    @Operation(summary = "find all authority list")
    @GetMapping("/api/user-authorities/all")
    public ResponseEntity<List<String>> find() {
        return ResponseEntity.ok().body(Arrays.asList(ANONYMOUS, USER, ADMIN, DEVELOPER));
    }
}
