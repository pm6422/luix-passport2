package cn.luixtech.passport.server.controller;

import cn.luixtech.passport.server.event.LogoutEvent;
import cn.luixtech.passport.server.persistence.tables.daos.UserDao;
import cn.luixtech.passport.server.persistence.tables.pojos.User;
import cn.luixtech.passport.server.pojo.ManagedUser;
import cn.luixtech.passport.server.pojo.ChangePassword;
import cn.luixtech.passport.server.pojo.ResetPassword;
import cn.luixtech.passport.server.service.MailService;
import cn.luixtech.passport.server.service.UserService;
import cn.luixtech.passport.server.utils.AuthUtils;
import com.luixtech.springbootframework.component.HttpHeaderCreator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.context.ApplicationEventPublisher;
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
    private final HttpHeaderCreator         httpHeaderCreator;
    private final MailService               mailService;
    private final UserDao                   userDao;
    private final UserService               userService;
    private final ApplicationEventPublisher applicationEventPublisher;

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

    @Operation(summary = "activate the account according to the activation code")
    @GetMapping("/open-api/accounts/activate/{code:[0-9]+}")
    public void activate(@Parameter(description = "activation code", required = true) @PathVariable String code) {
        userService.activate(code);
    }

    @Operation(summary = "update current user")
    @PutMapping("/api/accounts/user")
    public ResponseEntity<Void> updateAccount(@Parameter(description = "new user", required = true) @Valid @RequestBody User domain) {
        // For security reason
        User currentUser = userDao.findById(AuthUtils.getCurrentUserId());
        domain.setId(currentUser.getId());
        domain.setUsername(currentUser.getUsername());
        domain.setEnabled(currentUser.getEnabled());
        domain.setActivated(currentUser.getActivated());
        domain.setProfilePhotoEnabled(currentUser.getProfilePhotoEnabled());

        userDao.update(domain);
        return ResponseEntity.ok().headers(httpHeaderCreator.createSuccessHeader("SM1002", domain.getUsername())).build();
    }

    @Operation(summary = "modify the password of the current user")
    @PutMapping("/api/accounts/password")
    public ResponseEntity<Void> changePassword(@Parameter(description = "new password", required = true) @RequestBody @Valid ChangePassword dto) {
        // For security reason
        userService.changePassword(AuthUtils.getCurrentUserId(), dto);
        // Logout asynchronously
        applicationEventPublisher.publishEvent(new LogoutEvent(this));
        return ResponseEntity.ok().headers(httpHeaderCreator.createSuccessHeader("SM1002", "password")).build();
    }

    @Operation(summary = "send reset password email")
    @PostMapping("/open-api/accounts/request-reset")
    public ResponseEntity<Void> requestReset(HttpServletRequest request,
                                             @Parameter(description = "email", required = true) @RequestBody String email) {
        User user = userService.requestPasswordReset(email, RandomStringUtils.randomNumeric(20));
        mailService.sendPasswordResetMail(user, getRequestUrl(request));
        return ResponseEntity.ok().headers(httpHeaderCreator.createSuccessHeader("NM2002")).build();
    }

    @Operation(summary = "reset password")
    @PostMapping("/open-api/accounts/reset")
    public ResponseEntity<Void> reset(@Parameter(description = "reset code and new password", required = true) @RequestBody @Valid ResetPassword dto) {
        userService.resetPassword(dto.getResetCode(), dto.getNewRawPassword());
        return ResponseEntity.ok().headers(httpHeaderCreator.createSuccessHeader("NM2003")).build();
    }
}
