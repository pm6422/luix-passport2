package cn.luixtech.passport.server.event;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AbstractAuthenticationFailureEvent;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.authentication.event.LogoutSuccessEvent;
import org.springframework.security.authorization.event.AuthorizationDeniedEvent;
import org.springframework.security.authorization.event.AuthorizationEvent;
import org.springframework.security.authorization.event.AuthorizationGrantedEvent;
import org.springframework.stereotype.Component;

import static cn.luixtech.passport.server.utils.AuthUtils.getCurrentUser;
import static cn.luixtech.passport.server.utils.AuthUtils.getCurrentUsername;

@Slf4j
@Component
public class AuthenticationEventListener {
    @EventListener
    public void authenticationSuccessEvent(AuthenticationSuccessEvent event) {
        log.info("Authenticated successfully for user: {}", getCurrentUser(event.getAuthentication()));
    }

    @EventListener
    public void authenticationFailureEvent(AbstractAuthenticationFailureEvent event) {
        log.warn("Authenticate failed for user: " + getCurrentUser(event.getAuthentication()) + " with exception: " + event.getException().getMessage());
    }

    @EventListener
    public void logoutSuccessEvent(LogoutSuccessEvent event) {
        log.info("Logged out for user: [{}] and initiated by {}", getCurrentUsername(event.getAuthentication()),
                event.getSource().getClass().getSimpleName());
    }

    @EventListener
    public void authorizationGrantedEvent(AuthorizationGrantedEvent event) {
        log.info("Granted authorization for user: [{}] and initiated by {}", getCurrentUsername(event.getAuthentication().get()),
                event.getSource().getClass().getSimpleName());
    }

    @EventListener
    public void authorizationDeniedEvent(AuthorizationDeniedEvent event) {
        log.warn("Denied authorization for user: [{}] and initiated by {}", getCurrentUsername(event.getAuthentication().get()),
                event.getSource().getClass().getSimpleName());
    }

    @EventListener
    public void authorizationEvent(AuthorizationEvent event) {
        log.info("Authorization result: {} for user: [{}] and initiated by {}", event.getAuthorizationDecision(),
                getCurrentUsername(event.getAuthentication().get())
                , event.getSource().getClass().getSimpleName());
    }
}