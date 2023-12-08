package cn.luixtech.passport.server.controller;

import cn.luixtech.passport.server.persistence.tables.pojos.User;
import cn.luixtech.passport.server.pojo.ManagedUser;
import cn.luixtech.passport.server.service.MailService;
import cn.luixtech.passport.server.service.UserService;
import com.luixtech.springbootframework.component.HttpHeaderCreator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.luixtech.springbootframework.utils.NetworkUtils.getRequestUrl;

/**
 * REST controller for managing the user's account.
 */
@RestController
@AllArgsConstructor
@Slf4j
public class AccountController {
    private final HttpHeaderCreator httpHeaderCreator;
    private final MailService       mailService;
    private final UserService       userService;

    @Operation(summary = "register a new user and send an activation email")
    @PostMapping("/open-api/accounts/register")
    public ResponseEntity<Void> register(HttpServletRequest request,
                                         @Parameter(description = "user", required = true) @Valid @RequestBody ManagedUser managedUser) {
        log.debug("REST request to register user: {}", managedUser);
        User newUser = userService.insert(managedUser.toUser(), managedUser.getAuthorities(), managedUser.getPassword());
        mailService.sendActivationEmail(newUser, getRequestUrl(request));
        HttpHeaders headers = httpHeaderCreator.createSuccessHeader("NM2001");
        return ResponseEntity.status(HttpStatus.CREATED).headers(headers).build();
    }
}
