package cn.luixtech.passport.server.config.formauth.event;

import cn.luixtech.passport.server.config.AuthUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Slf4j
@Component
public class SignedInEventListener implements Consumer<AuthUser> {
    @Override
    public void accept(AuthUser o) {
        log.info("Signed in successfully for user: {}", o);
    }
}
