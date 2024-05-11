package cn.luixtech.passport.server.event;

import cn.luixtech.passport.server.config.oauth.AuthUser;
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
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.session.Session;
import org.springframework.stereotype.Component;

import java.util.List;

import static cn.luixtech.passport.server.utils.AuthUtils.getCurrentUserId;
import static cn.luixtech.passport.server.utils.AuthUtils.getCurrentUsername;

@Slf4j
@Component
@AllArgsConstructor
public class AuthenticationEventListener {
    private UserAuthEventRepository                             userAuthEventRepository;
    private SpringSessionService                                springSessionService;
    private FindByIndexNameSessionRepository<? extends Session> sessions;
    private SessionRegistry                                     sessionRegistry;

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
        sessions.findByPrincipalName(event.getUsername()).values().stream().forEach(session -> {
//            session.i
        });

        List<Object> allPrincipals = sessionRegistry.getAllPrincipals();
        for (Object principal : allPrincipals) {
            if (principal instanceof AuthUser authUser) {
                if (authUser.getUsername().equals(event.getUsername())) {
                    List<SessionInformation> sessionsInfo = sessionRegistry.getAllSessions(principal, false);
                    if (null != sessionsInfo && sessionsInfo.size() > 0) {
                        for (SessionInformation sessionInformation : sessionsInfo) {
                            log.info("Exprire now :" + sessionInformation.getSessionId());
                            //Expire or logout the user
                            sessionInformation.expireNow();
                        }
                    }
                }
            }
        }
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