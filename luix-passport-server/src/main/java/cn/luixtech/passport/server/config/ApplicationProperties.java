package cn.luixtech.passport.server.config;

import lombok.Data;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import java.util.LinkedHashMap;

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

    private final Account   account   = new Account();
    private final Mail      mail      = new Mail();
    private final Url       url       = new Url();
    private final AllowCors allowCors = new AllowCors();

    @Data
    public static class Account {
        private String defaultPassword;
    }

    @Data
    public static class Mail {
        private String resendApiKey;
        private String fromUsername;
        private String fromDisplayName;
    }

    @Data
    public static class Url {
        private String authServerUrl;
    }

    @Data
    public static class AllowCors {
        private LinkedHashMap<String, String> mappings = new LinkedHashMap<>();
    }
}
