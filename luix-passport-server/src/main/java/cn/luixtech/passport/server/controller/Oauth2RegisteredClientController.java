package cn.luixtech.passport.server.controller;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class Oauth2RegisteredClientController {

//    RegisteredClient registeredClient = RegisteredClient
//            .withId(IdGenerator.generateId())
//            .clientId(AUTH_CODE_CLIENT_ID)
////				.clientSecret("{noop}secret")
//            .clientSecret("{bcrypt}"+new BCryptPasswordEncoder().encode("secret"))
//            .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
//            .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
//            .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
//            .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
////				.authorizationGrantType(AuthorizationGrantType.PASSWORD)
//            .redirectUri("http://127.0.0.1:4003/login/oauth2/code/messaging-client-oidc")
//            .redirectUri("http://127.0.0.1:4003/authorized")
//            .postLogoutRedirectUri("http://127.0.0.1:4003/logged-out")
//            .scope(OidcScopes.OPENID)
//            .scope(OidcScopes.PROFILE)
//            .scope("message.read")
//            .scope("message.write")
//            .clientSettings(ClientSettings.builder().requireAuthorizationConsent(true).build())
//            .build();
//
//    RegisteredClient deviceClient = RegisteredClient
//            .withId(IdGenerator.generateId())
//            .clientId("device-messaging-client")
//            .clientAuthenticationMethod(ClientAuthenticationMethod.NONE)
//            .authorizationGrantType(AuthorizationGrantType.DEVICE_CODE)
//            .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
//            .scope("message.read")
//            .scope("message.write")
//            .build();
//
//    // Save registered client's in db as if in-memory
//    JdbcRegisteredClientRepository registeredClientRepository = new JdbcRegisteredClientRepository(jdbcTemplate);
//		registeredClientRepository.save(registeredClient);
//		registeredClientRepository.save(deviceClient);
}
