package cn.luixtech.passport.server.controller;

import cn.luixtech.passport.server.config.ApplicationProperties;
import cn.luixtech.passport.server.event.LogoutEvent;
import cn.luixtech.passport.server.persistence.tables.daos.UserDao;
import cn.luixtech.passport.server.persistence.tables.pojos.User;
import cn.luixtech.passport.server.pojo.ManagedUser;
import cn.luixtech.passport.server.service.MailService;
import cn.luixtech.passport.server.service.UserService;
import cn.luixtech.passport.server.utils.AuthUtils;
import com.luixtech.springbootframework.component.HttpHeaderCreator;
import com.luixtech.utilities.exception.DataNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

import static com.luixtech.springbootframework.utils.HttpHeaderUtils.generatePageHeaders;
import static com.luixtech.springbootframework.utils.NetworkUtils.getRequestUrl;

/**
 * REST controller for managing users.
 */
@RestController
@AllArgsConstructor
@Slf4j
public class UserController {
    public static final String                    GET_PROFILE_PHOTO_URL = "/api/users/profile-photo/";
    private final       ApplicationProperties     applicationProperties;
    //    private final       UserProfilePhotoRepository userProfilePhotoRepository;
    private final       UserDao                   userDao;
    private final       UserService               userService;
    private final       MailService               mailService;
    private final       ApplicationEventPublisher applicationEventPublisher;
    private final       HttpHeaderCreator         httpHeaderCreator;

    @Operation(summary = "create new user and send activation email")
    @PostMapping("/api/users")
    public ResponseEntity<Void> create(HttpServletRequest request,
                                       @Parameter(description = "user", required = true) @Valid @RequestBody User domain) {
        log.debug("REST request to create user: {}", domain);
        User newUser = userService.insert(domain, null, applicationProperties.getAccount().getDefaultPassword());
        mailService.sendCreationEmail(newUser, getRequestUrl(request));
        HttpHeaders headers = httpHeaderCreator.createSuccessHeader("NM2011", applicationProperties.getAccount().getDefaultPassword());
        return ResponseEntity.status(HttpStatus.CREATED).headers(headers).build();
    }

    @Operation(summary = "find user list")
    @GetMapping("/api/users")
    public ResponseEntity<List<User>> find(@ParameterObject Pageable pageable,
                                           @Parameter(description = "username") @RequestParam(value = "username", required = false) String username,
                                           @Parameter(description = "email") @RequestParam(value = "email", required = false) String email,
                                           @Parameter(description = "mobileNo") @RequestParam(value = "mobileNo", required = false) String mobileNo,
                                           @Parameter(description = "enabled") @RequestParam(value = "enabled", required = false) Boolean enabled,
                                           @Parameter(description = "activated") @RequestParam(value = "activated", required = false) Boolean activated) {
        Page<User> domains = userService.find(pageable, username, email, mobileNo, enabled, activated);
        return ResponseEntity.ok().headers(generatePageHeaders(domains)).body(domains.getContent());
    }

    @Operation(summary = "find user by id")
    @GetMapping("/api/users/{id}")
    public ResponseEntity<ManagedUser> findById(@Parameter(description = "ID", required = true) @PathVariable String id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @Operation(summary = "update user")
    @PutMapping("/api/users")
    public ResponseEntity<Void> update(@Parameter(description = "new user", required = true) @Valid @RequestBody ManagedUser domain) {
        log.debug("REST request to update user: {}", domain);
        userService.update(domain, domain.getAuthorities());
        if (domain.getId().equals(AuthUtils.getCurrentUserId())) {
            // Logout if current user were changed
            applicationEventPublisher.publishEvent(new LogoutEvent(this));
        }
        return ResponseEntity.ok().headers(httpHeaderCreator.createSuccessHeader("SM1002", domain.getUsername())).build();
    }

    @Operation(summary = "delete user by id", description = "the data may be referenced by other data, and some problems may occur after deletion")
    @DeleteMapping("/api/users/{id}")
    public ResponseEntity<Void> delete(@Parameter(description = "ID", required = true) @PathVariable String id) {
        log.debug("REST request to delete user: {}", id);
        userDao.deleteById(id);
        return ResponseEntity.ok().headers(httpHeaderCreator.createSuccessHeader("SM1003", id)).build();
    }

    @Operation(summary = "reset password")
    @PutMapping("/api/users/reset/{id}")
    public ResponseEntity<Void> resetPassword(@Parameter(description = "id", required = true) @PathVariable String id) {
        log.debug("REST reset the password of user: {}", id);
        userService.changePassword(id, null, applicationProperties.getAccount().getDefaultPassword());
        HttpHeaders headers = httpHeaderCreator.createSuccessHeader("NM2012", applicationProperties.getAccount().getDefaultPassword());
        return ResponseEntity.ok().headers(headers).build();
    }
//
//    @Operation(summary = "get user profile photo")
//    @GetMapping(GET_PROFILE_PHOTO_URL + "{username:[a-zA-Z0-9-]+}")
//    public ResponseEntity<byte[]> getProfilePhoto(@Parameter(description = "username", required = true) @PathVariable String username) {
//        User user = userService.findOneByUsername(username);
//        Optional<UserProfilePhoto> userProfilePhoto = userProfilePhotoRepository.findByUserId(user.getId());
//        return userProfilePhoto.map(photo -> ResponseEntity.ok(photo.getProfilePhoto())).orElse(null);
//    }
}
