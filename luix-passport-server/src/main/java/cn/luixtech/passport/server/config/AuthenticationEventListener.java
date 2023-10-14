package cn.luixtech.passport.server.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.event.AbstractAuthenticationFailureEvent;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.authentication.event.LogoutSuccessEvent;
import org.springframework.security.authorization.event.AuthorizationDeniedEvent;
import org.springframework.security.authorization.event.AuthorizationEvent;
import org.springframework.security.authorization.event.AuthorizationGrantedEvent;
import org.springframework.stereotype.Component;

import static cn.luixtech.passport.server.config.oauth.AuthUtils.getCurrentUser;

@Slf4j
@Component
public class AuthenticationEventListener {
    @EventListener
    @Async
    public void authenticationSuccessEvent(AuthenticationSuccessEvent event) {
        log.info("Authenticated successfully for user: {}", getCurrentUser(event.getAuthentication()));
    }

    @EventListener
    public void authenticationFailureEvent(AbstractAuthenticationFailureEvent event) {
        log.warn("Authenticate failed for user: " + getCurrentUser(event.getAuthentication()) + " with exception: " + event.getException().getMessage());
    }

    /**
     * Refer to {@link org.springframework.security.web.authentication.logout.LogoutSuccessEventPublishingLogoutHandler}
     *
     * @param event
     */
    @EventListener
    public void logoutSuccessEvent(LogoutSuccessEvent event) {
        log.info("Processing logout event initiated by {}", event.getSource().getClass().getSimpleName());
    }

    @EventListener
    public void authorizationGrantedEvent(AuthorizationGrantedEvent event) {
        log.info("Processing authorization granted event initiated by {}", event.getSource().getClass().getSimpleName());
    }

    @EventListener
    public void authorizationEvent(AuthorizationEvent event) {
        log.info("Processing authorization event initiated by {}", event.getSource().getClass().getSimpleName());
    }

    @EventListener
    public void authorizationDeniedEvent(AuthorizationDeniedEvent event) {
        log.info("Processing authorization denied event initiated by {}", event.getSource().getClass().getSimpleName());
    }
}