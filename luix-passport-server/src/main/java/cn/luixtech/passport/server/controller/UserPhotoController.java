package cn.luixtech.passport.server.controller;

import cn.luixtech.passport.server.persistence.tables.daos.UserPhotoDao;
import cn.luixtech.passport.server.persistence.tables.pojos.UserPhoto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

/**
 * REST controller for managing users photos.
 */
@RestController
@AllArgsConstructor
@Slf4j
public class UserPhotoController {
    private final UserPhotoDao userPhotoDao;

    @Operation(summary = "find user profile photo by user id")
    @GetMapping("/api/user-photos/{id}")
    public ResponseEntity<byte[]> findById(@Parameter(description = "id", required = true) @PathVariable String id) {
        Optional<UserPhoto> userPhoto = Optional.ofNullable(userPhotoDao.findById(id));
        return userPhoto.map(photo -> ResponseEntity.ok(photo.getProfilePhoto())).orElse(null);
    }
}
