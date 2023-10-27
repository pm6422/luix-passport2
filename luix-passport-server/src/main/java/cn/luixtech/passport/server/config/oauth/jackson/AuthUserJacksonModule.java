package cn.luixtech.passport.server.config.oauth.jackson;

import cn.luixtech.passport.server.config.oauth.AuthUser;
import cn.luixtech.passport.server.config.oauth.jackson.mixin.ArrayWhitelistMixin;
import cn.luixtech.passport.server.config.oauth.jackson.mixin.AuthUserMixin;
import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.security.jackson2.SecurityJackson2Modules;

import java.util.LinkedHashSet;

public class AuthUserJacksonModule extends SimpleModule {

    public AuthUserJacksonModule() {
        super(AuthUserJacksonModule.class.getName(), new Version(1, 0, 0, null, null, null));
    }

    @Override
    public void setupModule(SetupContext context) {
        SecurityJackson2Modules.enableDefaultTyping(context.getOwner());
        context.setMixInAnnotations(AuthUser.class, AuthUserMixin.class);
        context.setMixInAnnotations(LinkedHashSet.class, ArrayWhitelistMixin.class);
    }
}
