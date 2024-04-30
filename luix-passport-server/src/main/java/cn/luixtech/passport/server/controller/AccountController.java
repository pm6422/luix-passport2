package cn.luixtech.passport.server.controller;

import cn.luixtech.passport.server.domain.User;
import cn.luixtech.passport.server.domain.UserPhoto;
import cn.luixtech.passport.server.event.LogoutEvent;
import cn.luixtech.passport.server.pojo.AuthUser;
import cn.luixtech.passport.server.pojo.ChangePassword;
import cn.luixtech.passport.server.pojo.ManagedUser;
import cn.luixtech.passport.server.pojo.PasswordRecovery;
import cn.luixtech.passport.server.repository.UserPhotoRepository;
import cn.luixtech.passport.server.repository.UserRepository;
import cn.luixtech.passport.server.service.MailService;
import cn.luixtech.passport.server.service.UserPhotoService;
import cn.luixtech.passport.server.service.UserService;
import cn.luixtech.passport.server.utils.AuthUtils;
import com.luixtech.springbootframework.component.HttpHeaderCreator;
import com.luixtech.springbootframework.component.MessageCreator;
import com.luixtech.utilities.encryption.JasyptEncryptUtils;
import com.luixtech.utilities.exception.DataNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.Validate;
import org.apache.commons.lang3.time.FastDateFormat;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static cn.luixtech.passport.server.service.AuthorityService.*;
import static com.luixtech.springbootframework.utils.NetworkUtils.getRequestUrl;

/**
 * REST controller for managing the user's account.
 */
@RestController
@AllArgsConstructor
@Slf4j
public class AccountController {
    private static final FastDateFormat            DATETIME_FORMAT = FastDateFormat.getInstance("yyyyMMdd-HHmmss");
    private final        HttpHeaderCreator         httpHeaderCreator;
    private final        MessageCreator            messageCreator;
    private final        MailService               mailService;
    private final        UserRepository            userRepository;
    private final        UserPhotoRepository       userPhotoRepository;
    private final        UserService               userService;
    private final        UserPhotoService          userPhotoService;
    private final        ApplicationEventPublisher applicationEventPublisher;

    @Operation(summary = "get current user who are signed in")
    @GetMapping("/open-api/accounts/user")
    public ResponseEntity<AuthUser> getCurrentUser() {
        return AuthUtils.getCurrentUserId() == null ?
                ResponseEntity.ok(null) :
                ResponseEntity.ok(AuthUser.of(userService.findById(AuthUtils.getCurrentUserId())));
    }

    @Operation(summary = "update current user")
    @PutMapping("/api/accounts/user")
    public ResponseEntity<Void> update(@Parameter(description = "new user info", required = true) @Valid @RequestBody User domain) {
        User currentUser = userRepository.findById(AuthUtils.getCurrentUserId()).orElseThrow(() -> new DataNotFoundException(AuthUtils.getCurrentUserId()));
        Validate.isTrue(StringUtils.isNotEmpty(domain.getId()) && currentUser.getId().equals(domain.getId()), "Invalid user ID!");
        userService.update(domain);
        return ResponseEntity.ok().headers(httpHeaderCreator.createSuccessHeader("SM1002", domain.getUsername())).build();
    }

    @Operation(summary = "update password of the current user")
    @PutMapping("/api/accounts/password")
    public ResponseEntity<Void> changePassword(HttpServletRequest request,
                                               @Parameter(description = "new password", required = true) @Valid @RequestBody ChangePassword dto) {
        // For security reason
        User user = userService.changePassword(AuthUtils.getCurrentUserId(), dto.getOldRawPassword(), dto.getNewRawPassword());
        mailService.sendPasswordChangedMail(user, getRequestUrl(request));
        // Logout asynchronously
        applicationEventPublisher.publishEvent(new LogoutEvent(this));
        return ResponseEntity.ok().headers(httpHeaderCreator.createSuccessHeader("SM1002", messageCreator.getMessage("password"))).build();
    }

    @Operation(summary = "register a new user and send an account activation email")
    @PostMapping("/open-api/accounts/register")
    public ResponseEntity<Void> register(HttpServletRequest request,
                                         @Parameter(description = "user", required = true) @Valid @RequestBody ManagedUser managedUser) {
        User newUser = userService.insert(managedUser.toUser(), managedUser.getRoles(), managedUser.getPassword(), false);
        mailService.sendAccountActivationEmail(newUser, getRequestUrl(request));
        HttpHeaders headers = httpHeaderCreator.createSuccessHeader("SM1021", newUser.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).headers(headers).build();
    }

    @Operation(summary = "activate the account by activation code")
    @GetMapping("/open-api/accounts/activate/{code}")
    public void activate(@Parameter(description = "activation code", required = true) @PathVariable String code) {
        userService.activate(code);
    }

    @Operation(summary = "send verification code email")
    @PostMapping("/api/accounts/request-verification-code")
    public ResponseEntity<Void> requestVerificationCode(HttpServletRequest request,
                                                       @Parameter(description = "email", required = true) @RequestParam String email) {
        User currentUser = userRepository.findById(AuthUtils.getCurrentUserId()).orElseThrow(() -> new DataNotFoundException(AuthUtils.getCurrentUserId()));
        User user = userService.requestVerificationCode(currentUser, email);
        mailService.sendVerificationCodeMail(user, email, getRequestUrl(request));
        return ResponseEntity.ok().headers(httpHeaderCreator.createSuccessHeader("NM1002")).build();
    }

    @Operation(summary = "send password recovery email")
    @PostMapping("/open-api/accounts/request-password-recovery")
    public ResponseEntity<Void> requestRecoverPassword(HttpServletRequest request,
                                                       @Parameter(description = "email", required = true) @RequestParam String email) {
        User user = userService.requestPasswordRecovery(email);
        mailService.sendPasswordRecoveryMail(user, getRequestUrl(request));
        return ResponseEntity.ok().headers(httpHeaderCreator.createSuccessHeader("NM1002")).build();
    }

    @Operation(summary = "complete password recovery")
    @PostMapping("/open-api/accounts/complete-password-recovery")
    public ResponseEntity<Void> completeRecoverPassword(@Parameter(description = "reset code and new password", required = true) @Valid @RequestBody PasswordRecovery dto) {
        String resetCode;
        try {
            resetCode = JasyptEncryptUtils.decrypt(dto.getResetCode());
        } catch (Exception ex) {
            throw new IllegalArgumentException(messageCreator.getMessage("IA2001"));
        }
        userService.resetPassword(resetCode, dto.getNewRawPassword());
        return ResponseEntity.ok().headers(httpHeaderCreator.createSuccessHeader("NM1003")).build();
    }

    @Operation(summary = "get profile photo of the current user")
    @GetMapping("/api/accounts/profile-photo")
    public ResponseEntity<byte[]> getProfilePhoto() {
        Optional<UserPhoto> userPhoto = userPhotoRepository.findById(AuthUtils.getCurrentUserId());
        return userPhoto.map(photo -> ResponseEntity.ok(photo.getPhoto())).orElse(null);
    }

    @Operation(summary = "upload profile photo of the current user")
    @PutMapping("/api/accounts/profile-photo/upload")
    public void uploadProfilePhoto(@Parameter(description = "file description", required = true) @RequestPart String description,
                                   @Parameter(description = "user profile photo", required = true) @RequestPart MultipartFile file) throws IOException {
        User user = Optional.ofNullable(userService.findById(AuthUtils.getCurrentUserId())).orElseThrow(() -> new DataNotFoundException(AuthUtils.getCurrentUserId()));
        userPhotoService.save(user, file.getBytes());
        log.info("Uploaded profile photo with file name {} and description {}", file.getOriginalFilename(), description);
    }

    @Operation(summary = "download profile photo of the current user")
    @GetMapping("/api/accounts/profile-photo/download")
    public ResponseEntity<Resource> downloadProfilePhoto() {
        Optional<UserPhoto> existingOne = userPhotoRepository.findById(AuthUtils.getCurrentUserId());
        if (existingOne.isEmpty()) {
            return ResponseEntity.ok().body(null);
        }
        ByteArrayResource resource = new ByteArrayResource(existingOne.get().getPhoto());
        String fileName = "photo-" + DATETIME_FORMAT.format(new Date()) + ".jpg";
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + fileName)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(existingOne.get().getPhoto().length)
                .body(resource);

//        String path = System.getProperty("user.home") + File.separator + "fileName.txt";
//        File outFile = ResourceUtils.getFile(path);
//        FileUtils.writeLines(outFile, strList);
    }

    @Operation(summary = "get all authority names")
    @GetMapping("/api/accounts/all-authorities")
    public ResponseEntity<List<String>> getAuthorityNames() {
        return ResponseEntity.ok(Arrays.asList(AUTH_ANONYMOUS, AUTH_USER, AUTH_ADMIN, AUTH_DEVELOPER));
    }

    @Operation(summary = "delete current user")
    @DeleteMapping("/api/accounts")
    public void delete() {
        userService.deleteById(AuthUtils.getCurrentUserId());
    }
}
