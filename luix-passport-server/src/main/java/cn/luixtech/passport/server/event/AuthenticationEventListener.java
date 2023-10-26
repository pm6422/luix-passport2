package cn.luixtech.passport.server.event;

import cn.luixtech.passport.server.persistence.tables.daos.UserAuthenticationEventDao;
import cn.luixtech.passport.server.persistence.tables.pojos.UserAuthenticationEvent;
import com.luixtech.uidgenerator.core.id.IdGenerator;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AbstractAuthenticationFailureEvent;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.authentication.event.LogoutSuccessEvent;
import org.springframework.security.authorization.event.AuthorizationDeniedEvent;
import org.springframework.security.authorization.event.AuthorizationEvent;
import org.springframework.security.authorization.event.AuthorizationGrantedEvent;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

import static cn.luixtech.passport.server.utils.AuthUtils.*;

@Slf4j
@Component
@AllArgsConstructor
public class AuthenticationEventListener {
    private UserAuthenticationEventDao userAuthenticationEventDao;

    @EventListener
    public void authenticationSuccessEvent(AuthenticationSuccessEvent event) {
        String userId = getCurrentUserId();
        if (StringUtils.isNotEmpty(userId)) {
            UserAuthenticationEvent domain = new UserAuthenticationEvent();
            domain.setId(IdGenerator.generateId());
            domain.setUserId(userId);
            domain.setEvent("AuthenticationSuccess");
            domain.setDescription(event.getSource().getClass().getSimpleName());
            domain.setCreatedTime(LocalDateTime.now());
            userAuthenticationEventDao.insert(domain);
            log.info("Authenticated successfully for user: {}", userId);
        }
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