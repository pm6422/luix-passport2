package com.luixtech.sso.starter.config;

import org.springframework.context.annotation.Import;

import java.lang.annotation.*;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import({ShiroProperties.class, LuixSsoProperties.class, RedisAutoConfiguration.class, SsoServerAutoConfiguration.class})
public @interface EnableLuixSsoServer {
}
