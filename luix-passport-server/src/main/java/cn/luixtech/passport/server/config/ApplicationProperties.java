package cn.luixtech.passport.server.config;

import lombok.Data;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

/**
 * Properties specific to Application.
 *
 * <p>
 * Properties are configured in the application.yml file.
 * </p>
 */
@Component
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
@Validated
@Getter
public class ApplicationProperties {

    private final Account account = new Account();
    private final Url     url     = new Url();

    @Data
    public static class Account {
        private String defaultPassword;
    }

    @Data
    public static class Url {
        private String authServerUrl;
    }
}
