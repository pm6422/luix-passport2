//package cn.luixtech.passport.server.controller;
//
//import cn.luixtech.passport.server.persistence.tables.daos.Oauth2RegisteredClientDao;
//import cn.luixtech.passport.server.persistence.tables.pojos.Oauth2RegisteredClient;
//import cn.luixtech.passport.server.pojo.OAuth2Client;
//import com.luixtech.springbootframework.component.HttpHeaderCreator;
//import com.luixtech.utilities.exception.DataNotFoundException;
//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.Parameter;
//import jakarta.validation.Valid;
//import lombok.AllArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.apache.commons.lang3.tuple.Pair;
//import org.springdoc.core.annotations.ParameterObject;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
//import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//
//import static cn.luixtech.passport.server.service.AuthorityService.ADMIN;
//import static com.luixtech.springbootframework.utils.HttpHeaderUtils.generatePageHeaders;
//
//@Slf4j
//@RestController
//@AllArgsConstructor
//public class Oauth2ClientController {
//    private final HttpHeaderCreator          httpHeaderCreator;
//    private final RegisteredClientRepository registeredClientRepository;
//    private final Oauth2RegisteredClientDao  oauth2RegisteredClientDao;
//
////    RegisteredClient registeredClient = RegisteredClient
////            .withId(IdGenerator.generateId())
////            .clientId(AUTH_CODE_CLIENT_ID)
//////				.clientSecret("{noop}secret")
////            .clientSecret("{bcrypt}"+new BCryptPasswordEncoder().encode("secret"))
////            .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
////            .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
////            .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
////            .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
//////				.authorizationGrantType(AuthorizationGrantType.PASSWORD)
//// redirect for messaging-client-oidc
////            .redirectUri("http://127.0.0.1:4003/login/oauth2/code/messaging-client-oidc")
//// redirect for messaging-client-authorization-code
////            .redirectUri("http://127.0.0.1:4003/authorized")
////            .postLogoutRedirectUri("http://127.0.0.1:4003/logged-out")
////            .scope(OidcScopes.OPENID)
////            .scope(OidcScopes.PROFILE)
////            .scope("message.read")
////            .scope("message.write")
////            .clientSettings(ClientSettings.builder().requireAuthorizationConsent(true).build())
////            .build();
////
////    RegisteredClient deviceClient = RegisteredClient
////            .withId(IdGenerator.generateId())
////            .clientId("device-messaging-client")
////            .clientAuthenticationMethod(ClientAuthenticationMethod.NONE)
////            .authorizationGrantType(AuthorizationGrantType.DEVICE_CODE)
////            .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
////            .scope("message.read")
////            .scope("message.write")
////            .build();
////
////    // Save registered client's in db as if in-memory
////    JdbcRegisteredClientRepository registeredClientRepository = new JdbcRegisteredClientRepository(jdbcTemplate);
////		registeredClientRepository.save(registeredClient);
////		registeredClientRepository.save(deviceClient);
//
//    @Operation(summary = "create a new OAuth2 client")
//    @PostMapping("/api/oauth2-clients")
//    @PreAuthorize("hasAuthority(\"" + ADMIN + "\")")
//    public ResponseEntity<Void> create(@Parameter(description = "OAuth2 client", required = true) @Valid @RequestBody OAuth2Client pojo) {
//        log.debug("REST create oauth client: {}", pojo);
//        RegisteredClient registeredClient = pojo.toRegisteredClient();
//        registeredClientRepository.save(registeredClient);
//        return ResponseEntity.status(HttpStatus.CREATED)
//                .headers(httpHeaderCreator.createSuccessHeader("SM1001", pojo.getClientId()))
//                .build();
//    }
//
//    @Operation(summary = "get internal client")
//    @GetMapping("/open-api/oauth2-client/internal-client")
//    public ResponseEntity<Pair<String, String>> getInternalClient() {
//        return ResponseEntity.ok(Pair.of(OAuth2Client.INTERNAL_CLIENT_ID, OAuth2Client.INTERNAL_RAW_CLIENT_SECRET));
//    }
//
//    @Operation(summary = "find oauth2 client list")
//    @GetMapping("/api/oauth2-clients")
//    @PreAuthorize("hasAuthority(\"" + ADMIN + "\")")
//    public ResponseEntity<List<OAuth2Client>> find(@ParameterObject Pageable pageable,
//                                                   @Parameter(description = "Client ID") @RequestParam(value = "clientId", required = false) String clientId) {
//        Page<OAuth2Client> domains = oAuth2ClientService.find(pageable, clientId);
//        HttpHeaders headers = generatePageHeaders(domains);
//        return ResponseEntity.ok().headers(headers).body(domains.getContent());
//    }
//
//    @Operation(summary = "find oauth2 client by ID")
//    @GetMapping("/api/oauth2-clients/{id}")
//    @PreAuthorize("hasAuthority(\"" + ADMIN + "\")")
//    public ResponseEntity<OAuth2Client> findById(@Parameter(description = "ID", required = true) @PathVariable String id) {
//        OAuth2Client domain = OAuth2Client.fromRegisteredClient(oauth2RegisteredClientDao.findById(id));
//        return ResponseEntity.ok(domain);
//    }
//
//    @Operation(summary = "update oauth2 client")
//    @PutMapping("/api/oauth2-clients")
//    @PreAuthorize("hasAuthority(\"" + ADMIN + "\")")
//    public ResponseEntity<Void> update(@Parameter(description = "OAuth2 client", required = true) @Valid @RequestBody OAuth2Client domain) {
//        log.debug("REST request to update oauth client: {}", domain);
//        oAuth2ClientService.update(domain);
//        return ResponseEntity.ok()
//                .headers(httpHeaderCreator.createSuccessHeader("SM1002", domain.getClientId()))
//                .build();
//    }
//
//    @Operation(summary = "delete oauth2 client by ID", description = "the data may be referenced by other data, and some problems may occur after deletion")
//    @DeleteMapping("/api/oauth2-clients/{id}")
//    @PreAuthorize("hasAuthority(\"" + ADMIN + "\")")
//    public ResponseEntity<Void> delete(@Parameter(description = "ID", required = true) @PathVariable String id) {
//        log.debug("REST request to delete oauth client: {}", id);
//        Oauth2RegisteredClient client = Optional.ofNullable(oauth2RegisteredClientDao.findById(id)).orElseThrow(() -> new DataNotFoundException(id));
//        oauth2RegisteredClientDao.deleteById(id);
//        return ResponseEntity.ok()
//                .headers(httpHeaderCreator.createSuccessHeader("SM1003", client.getClientId())).build();
//    }
//}
