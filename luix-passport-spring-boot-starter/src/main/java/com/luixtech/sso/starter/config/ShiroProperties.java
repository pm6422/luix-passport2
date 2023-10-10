package com.luixtech.sso.starter.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@ConfigurationProperties(prefix = "shiro")
@Validated
@Data
public class ShiroProperties {

    private       Boolean enabled    = true;
    private final Web     web        = new Web();
    private       String  loginUrl   = "/login.jsp";
    private       String  successUrl = "/";
    private       String  unauthorizedUrl;

    @Data
    public static class Web {
        private Boolean enabled = true;
    }
}
