package cn.luixtech.passport.server.controller;

import cn.luixtech.passport.server.pojo.ProfileScopeUser;
import cn.luixtech.passport.server.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

import static cn.luixtech.passport.server.service.AuthorityService.*;

@Slf4j
@RestController
@AllArgsConstructor
public class ThirdPartyClientController {
    private final UserService userService;

    @Operation(summary = "find user by username")
    @GetMapping("/api/third-party-clients/user")
    public ResponseEntity<ProfileScopeUser> findByName(@Parameter(description = "username", required = true) @RequestParam(value = "username") String username) {
        return ResponseEntity.ok(userService.findByUsername(username));
    }

    @Operation(summary = "find all authority list")
    @GetMapping("/api/third-party-clients/authorities")
    public ResponseEntity<List<String>> authorities() {
        return ResponseEntity.ok().body(Arrays.asList(AUTH_ANONYMOUS, AUTH_USER, AUTH_ADMIN, AUTH_DEVELOPER));
    }
}
