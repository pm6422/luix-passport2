package cn.luixtech.passport.server.controller;

import cn.luixtech.passport.server.domain.UserPhoto;
import cn.luixtech.passport.server.repository.UserPhotoRepository;
import com.luixtech.utilities.encryption.JasyptEncryptUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

import static com.luixtech.utilities.encryption.JasyptEncryptUtils.DEFAULT_ALGORITHM;

/**
 * REST controller for managing users photos.
 */
@RestController
@AllArgsConstructor
@Slf4j
public class UserPhotoController {
    public static final String              USER_PHOTO_TOKEN_KEY = "dw4rfer54g&^@dsfd#";
    public static final String              USER_PHOTO_URL       = "/open-api/user-photos/";
    private final       UserPhotoRepository userPhotoRepository;

    @Operation(summary = "find user profile photo by user id")
    @GetMapping("/api/user-photos/{userId}")
    public ResponseEntity<byte[]> findById(@Parameter(description = "userId", required = true) @PathVariable String userId) {
        Optional<UserPhoto> userPhoto = userPhotoRepository.findById(userId);
        return userPhoto.map(photo -> ResponseEntity.ok(photo.getPhoto())).orElse(null);
    }

    @Operation(summary = "find user profile photo by user token")
    @GetMapping(USER_PHOTO_URL + "{userToken}")
    public ResponseEntity<byte[]> findByUserToken(@Parameter(description = "userToken", required = true) @PathVariable String userToken) {
        String userId = JasyptEncryptUtils.decrypt(userToken, DEFAULT_ALGORITHM, USER_PHOTO_TOKEN_KEY);
        return findById(userId);
    }
}
