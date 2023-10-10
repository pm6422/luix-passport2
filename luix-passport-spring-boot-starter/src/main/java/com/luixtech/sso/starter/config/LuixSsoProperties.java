package com.luixtech.sso.starter.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.util.LinkedHashMap;

@ConfigurationProperties(prefix = "luix.sso")
@Validated
@Data
public class LuixSsoProperties {

    private final Server server = new Server();
    private final Client client = new Client();

    @Data
    public static class Server {
        private boolean                       enabled;
        private String                        url                      = "http://localhost:5001";
        private LinkedHashMap<String, String> filterChainDefinitionMap = new LinkedHashMap<>();
    }

    @Data
    public static class Client {
        private boolean                       enabled;
        private LinkedHashMap<String, String> filterChainDefinitionMap = new LinkedHashMap<>();
    }
}
