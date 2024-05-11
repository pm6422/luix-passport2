package cn.luixtech.passport.server.event;

import cn.luixtech.passport.server.domain.UserAuthEvent;
import cn.luixtech.passport.server.repository.UserAuthEventRepository;
import cn.luixtech.passport.server.service.SpringSessionService;
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

import static cn.luixtech.passport.server.utils.AuthUtils.getCurrentUserId;
import static cn.luixtech.passport.server.utils.AuthUtils.getCurrentUsername;

@Slf4j
@Component
@AllArgsConstructor
public class AuthenticationEventListener {
    private UserAuthEventRepository userAuthEventRepository;
    private SpringSessionService    springSessionService;

    @EventListener
    public void authenticationSuccessEvent(AuthenticationSuccessEvent event) {
        String userId = getCurrentUserId();
        if (StringUtils.isNotEmpty(userId)) {
            // insert
            UserAuthEvent domain = new UserAuthEvent();
            domain.setUserId(userId);
            domain.setEvent("AuthenticationSuccess");
            domain.setRemark(event.getSource().getClass().getSimpleName());
            userAuthEventRepository.save(domain);
            log.info("Authenticated successfully for user: {}", userId);
        }
    }

    @EventListener
    public void authenticationFailureEvent(AbstractAuthenticationFailureEvent event) {
        String userId = getCurrentUserId();
        if (StringUtils.isNotEmpty(userId)) {
            // insert
            UserAuthEvent domain = new UserAuthEvent();
            domain.setUserId(userId);
            domain.setEvent("AuthenticationFailure");
            domain.setRemark(StringUtils.abbreviate(event.getException().getMessage(), 64));
            userAuthEventRepository.save(domain);
            log.warn("Authenticate failure for user: {} with exception: {}", userId, event.getException().getMessage());
        }
    }

    @EventListener
    public void logoutEvent(LogoutEvent event) {
        springSessionService.deleteByPrincipalName(event.getUsername());
    }

    @EventListener
    public void logoutSuccessEvent(LogoutSuccessEvent event) {
        String userId = getCurrentUserId();
        if (StringUtils.isNotEmpty(userId)) {
            // insert
            UserAuthEvent domain = new UserAuthEvent();
            domain.setId(IdGenerator.generateId());
            domain.setUserId(userId);
            domain.setEvent("LogoutSuccess");
            domain.setRemark(event.getSource().getClass().getSimpleName());
            userAuthEventRepository.save(domain);
            log.info("Logged out for user: [{}] and initiated by {}", userId, event.getSource().getClass().getSimpleName());
        }
    }

    @EventListener
    public void authorizationGrantedEvent(AuthorizationGrantedEvent<?> event) {
        log.info("Granted authorization for user: [{}] and initiated by {}", getCurrentUsername(event.getAuthentication().get()),
                event.getSource().getClass().getSimpleName());
    }

    @EventListener
    public void authorizationDeniedEvent(AuthorizationDeniedEvent<?> event) {
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