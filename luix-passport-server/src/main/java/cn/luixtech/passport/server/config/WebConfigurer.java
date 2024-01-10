package cn.luixtech.passport.server.config;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web application configuration
 */
@Configuration
@AllArgsConstructor
@Slf4j
public class WebConfigurer implements WebMvcConfigurer {
    private final ApplicationProperties applicationProperties;

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        // resolved logout CORS issue
        applicationProperties.getAllowedCors().getMappings().forEach((key, value) -> registry
                .addMapping(org.springframework.util.StringUtils.collectionToCommaDelimitedString(value))
                .allowedOrigins(key)
                .allowedMethods(HttpMethod.GET.name(), HttpMethod.POST.name(), HttpMethod.PUT.name(), HttpMethod.DELETE.name()));
    }
}