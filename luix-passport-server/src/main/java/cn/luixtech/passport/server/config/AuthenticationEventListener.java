package cn.luixtech.passport.server.config;

import cn.luixtech.passport.server.config.oauth.AuthUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.event.AbstractAuthenticationFailureEvent;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.authentication.event.LogoutSuccessEvent;
import org.springframework.security.authorization.event.AuthorizationDeniedEvent;
import org.springframework.security.authorization.event.AuthorizationEvent;
import org.springframework.security.authorization.event.AuthorizationGrantedEvent;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AuthenticationEventListener {
    @EventListener
    @Async
    public void onSuccess(AuthenticationSuccessEvent success) {
        User currentUser = AuthUtils.getCurrentUser(success.getAuthentication());
        log.info("Authenticated successfully for user: {}", success.getSource());
    }

    @EventListener
    public void onFailure(AbstractAuthenticationFailureEvent failures) {
        log.warn("Failed to authenticate user: " + failures.getSource() + " with exception: " + failures.getException().getMessage());
    }

    /**
     * Refer to {@link org.springframework.security.web.authentication.logout.LogoutSuccessEventPublishingLogoutHandler}
     *
     * @param event
     */
    @EventListener
    public void formLogoutSuccessEventListener(LogoutSuccessEvent event) {
        log.info("Processing logout event initiated by {}", event.getSource().getClass().getSimpleName());
    }

    @EventListener
    public void authorizationGrantedEventListener(AuthorizationGrantedEvent event) {
        log.info("Processing authorization granted event initiated by {}", event.getSource().getClass().getSimpleName());
    }

    @EventListener
    public void authorizationEventListener(AuthorizationEvent event) {
        log.info("Processing authorization event initiated by {}", event.getSource().getClass().getSimpleName());
    }

    @EventListener
    public void authorizationDeniedEventListener(AuthorizationDeniedEvent event) {
        log.info("Processing authorization denied event initiated by {}", event.getSource().getClass().getSimpleName());
    }
}