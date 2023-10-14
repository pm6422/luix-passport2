package cn.luixtech.passport.server.event;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.function.Consumer;

@Slf4j
public class FederatedIdentityLoginSuccessEventListener implements Consumer<OAuth2User> {
    @Override
    public void accept(OAuth2User oAuth2User) {
        log.info("Federated identity logged in successfully for user: {}", oAuth2User);
    }
}
