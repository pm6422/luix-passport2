package cn.luixtech.passport.server.config.formauth.event;

import jakarta.servlet.http.HttpSessionEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Slf4j
@Component
public class FormLogoutSuccessEventListener implements Consumer<HttpSessionEvent> {
    @Override
    public void accept(HttpSessionEvent event) {
        log.info("Logged out successfully for user: {}", event);
    }
}
