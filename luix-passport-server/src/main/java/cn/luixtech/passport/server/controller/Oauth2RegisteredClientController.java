package cn.luixtech.passport.server.controller;

import cn.luixtech.passport.server.persistence.tables.daos.Oauth2RegisteredClientDao;
import cn.luixtech.passport.server.persistence.tables.pojos.Oauth2RegisteredClient;
import cn.luixtech.passport.server.pojo.Oauth2Client;
import cn.luixtech.passport.server.service.Oauth2RegisteredClientService;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static cn.luixtech.passport.server.service.AuthorityService.ADMIN;
import static com.luixtech.springbootframework.utils.HttpHeaderUtils.generatePageHeaders;

@Slf4j
@RestController
@AllArgsConstructor
public class Oauth2RegisteredClientController {
    private final HttpHeaderCreator             httpHeaderCreator;
    private final Oauth2RegisteredClientDao     oauth2RegisteredClientDao;
    private final Oauth2RegisteredClientService oauth2RegisteredClientService;

    @Operation(summary = "create a new oauth2 client")
    @PostMapping("/api/oauth2-registered-clients")
    @PreAuthorize("hasAuthority(\"" + ADMIN + "\")")
    public ResponseEntity<Void> create(@Parameter(description = "OAuth2 client", required = true) @Valid @RequestBody Oauth2Client pojo) {
        oauth2RegisteredClientService.insert(pojo);
        return ResponseEntity.status(HttpStatus.CREATED)
                .headers(httpHeaderCreator.createSuccessHeader("SM1001", pojo.getClientId()))
                .build();
    }

    @Operation(summary = "find oauth2 client list")
    @GetMapping("/api/oauth2-registered-clients")
    @PreAuthorize("hasAuthority(\"" + ADMIN + "\")")
    public ResponseEntity<List<Oauth2Client>> find(@ParameterObject Pageable pageable,
                                                   @Parameter(description = "Client ID") @RequestParam(value = "clientId", required = false) String clientId) {
        Page<Oauth2Client> domains = oauth2RegisteredClientService.find(pageable, clientId);
        HttpHeaders headers = generatePageHeaders(domains);
        return ResponseEntity.ok().headers(headers).body(domains.getContent());
    }

    @Operation(summary = "find oauth2 client by ID")
    @GetMapping("/api/oauth2-registered-clients/{id}")
    @PreAuthorize("hasAuthority(\"" + ADMIN + "\")")
    public ResponseEntity<Oauth2Client> findById(@Parameter(description = "ID", required = true) @PathVariable String id) {
        Oauth2Client domain = oauth2RegisteredClientService.findById(id);
        return ResponseEntity.ok(domain);
    }

    @Operation(summary = "update oauth2 client")
    @PutMapping("/api/oauth2-registered-clients")
    @PreAuthorize("hasAuthority(\"" + ADMIN + "\")")
    public ResponseEntity<Void> update(@Parameter(description = "OAuth2 client", required = true) @Valid @RequestBody Oauth2Client pojo) {
        oauth2RegisteredClientService.update(pojo);
        return ResponseEntity.ok()
                .headers(httpHeaderCreator.createSuccessHeader("SM1002", pojo.getClientId()))
                .build();
    }

    @Operation(summary = "delete oauth2 client by ID", description = "the data may be referenced by other data, and some problems may occur after deletion")
    @DeleteMapping("/api/oauth2-registered-clients/{id}")
    @PreAuthorize("hasAuthority(\"" + ADMIN + "\")")
    public ResponseEntity<Void> delete(@Parameter(description = "ID", required = true) @PathVariable String id) {
        Oauth2RegisteredClient client = Optional.ofNullable(oauth2RegisteredClientDao.findById(id))
                .orElseThrow(() -> new DataNotFoundException(id));
        oauth2RegisteredClientDao.deleteById(id);
        return ResponseEntity.ok()
                .headers(httpHeaderCreator.createSuccessHeader("SM1003", client.getClientId())).build();
    }
}
