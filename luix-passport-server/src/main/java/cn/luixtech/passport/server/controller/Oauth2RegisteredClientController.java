package cn.luixtech.passport.server.controller;

import cn.luixtech.passport.server.persistence.tables.daos.Oauth2RegisteredClientDao;
import cn.luixtech.passport.server.persistence.tables.pojos.Oauth2RegisteredClient;
import cn.luixtech.passport.server.persistence.tables.pojos.User;
import cn.luixtech.passport.server.persistence.tables.pojos.UserPhoto;
import cn.luixtech.passport.server.pojo.Oauth2Client;
import cn.luixtech.passport.server.service.Oauth2RegisteredClientService;
import cn.luixtech.passport.server.utils.AuthUtils;
import com.luixtech.springbootframework.component.HttpHeaderCreator;
import com.luixtech.utilities.exception.DataNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static com.luixtech.springbootframework.utils.HttpHeaderUtils.generatePageHeaders;

@Slf4j
@RestController
@AllArgsConstructor
public class Oauth2RegisteredClientController {
    private final HttpHeaderCreator             httpHeaderCreator;
    private final Oauth2RegisteredClientDao     oauth2RegisteredClientDao;
    private final Oauth2RegisteredClientService oauth2RegisteredClientService;

    @Operation(summary = "create a new oauth2 registered client")
    @PostMapping("/api/oauth2-registered-clients")
    public ResponseEntity<Void> create(@Parameter(description = "oauth2 registered client", required = true) @Valid @RequestBody Oauth2Client pojo) {
        oauth2RegisteredClientService.insert(pojo);
        return ResponseEntity.status(HttpStatus.CREATED)
                .headers(httpHeaderCreator.createSuccessHeader("SM1001", pojo.getClientId()))
                .build();
    }

    @Operation(summary = "find oauth2 registered client list")
    @GetMapping("/api/oauth2-registered-clients")
    public ResponseEntity<List<Oauth2Client>> find(@ParameterObject Pageable pageable,
                                                   @Parameter(description = "Client ID") @RequestParam(value = "clientId", required = false) String clientId) {
        Page<Oauth2Client> domains = oauth2RegisteredClientService.find(pageable, clientId);
        HttpHeaders headers = generatePageHeaders(domains);
        return ResponseEntity.ok().headers(headers).body(domains.getContent());
    }

    @Operation(summary = "find oauth2 registered client by id")
    @GetMapping("/api/oauth2-registered-clients/{id}")
    public ResponseEntity<Oauth2Client> findById(@Parameter(description = "ID", required = true) @PathVariable String id) {
        Oauth2Client domain = oauth2RegisteredClientService.findById(id);
        return ResponseEntity.ok(domain);
    }

    @Operation(summary = "update oauth2 registered client")
    @PutMapping("/api/oauth2-registered-clients")
    public ResponseEntity<Void> update(@Parameter(description = "oauth2 registered client", required = true) @Valid @RequestBody Oauth2Client pojo) {
        oauth2RegisteredClientService.update(pojo);
        return ResponseEntity.ok()
                .headers(httpHeaderCreator.createSuccessHeader("SM1002", pojo.getClientId()))
                .build();
    }

    @Operation(summary = "delete oauth2 registered client by id", description = "the data may be referenced by other data, and some problems may occur after deletion")
    @DeleteMapping("/api/oauth2-registered-clients/{id}")
    public ResponseEntity<Void> delete(@Parameter(description = "ID", required = true) @PathVariable String id) {
        Oauth2RegisteredClient client = Optional.ofNullable(oauth2RegisteredClientDao.findById(id))
                .orElseThrow(() -> new DataNotFoundException(id));
        oauth2RegisteredClientDao.deleteById(id);
        return ResponseEntity.ok()
                .headers(httpHeaderCreator.createSuccessHeader("SM1003", client.getClientId())).build();
    }

    @Operation(summary = "upload photo of the oauth2 registered client")
    @PutMapping("/api/oauth2-registered-clients/photo/upload")
    public void uploadProfilePhoto(@Parameter(description = "id", required = true) @RequestPart String id,
                                   @Parameter(description = "photo", required = true) @RequestPart MultipartFile file) throws IOException {
        Oauth2RegisteredClient oauth2RegisteredClient = Optional.ofNullable(oauth2RegisteredClientDao.findById(id)).orElseThrow(() -> new DataNotFoundException(id));
        oauth2RegisteredClient.setPhoto(file.getBytes());
        oauth2RegisteredClientDao.update(oauth2RegisteredClient);
        log.info("Uploaded oauth2 registered client photo with file name {} and ID {}", file.getOriginalFilename(), id);
    }

    @Operation(summary = "find photo by id")
    @GetMapping("/api/oauth2-registered-clients/photo/{id}")
    public ResponseEntity<byte[]> findPhotoById(@Parameter(description = "id", required = true) @PathVariable String id) {
        Optional<Oauth2RegisteredClient> oauth2RegisteredClient = Optional.ofNullable(oauth2RegisteredClientDao.findById(id));
        return oauth2RegisteredClient.map(photo -> ResponseEntity.ok(photo.getPhoto())).orElse(null);
    }
}
