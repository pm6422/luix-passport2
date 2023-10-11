package cn.luixtech.passport.server.config.formauth.handler;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.event.LogoutSuccessEvent;
import org.springframework.stereotype.Component;


/**
 * Refer to {@link org.springframework.security.web.authentication.logout.LogoutSuccessEventPublishingLogoutHandler}
 */
@Slf4j
@Component
@AllArgsConstructor
public class FormLogoutSuccessEventListener {
    @Async
    @EventListener
    public void logoutEvent(LogoutSuccessEvent event) {
        log.info("Processing logout event initiated by {}", event.getSource().getClass().getSimpleName());
    }
}
