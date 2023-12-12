package cn.luixtech.passport.server.config;

import jakarta.servlet.ServletContext;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.ServletContextInitializer;
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
public class WebConfigurer implements ServletContextInitializer, WebMvcConfigurer {
    private final ApplicationProperties applicationProperties;

    @Override
    public void onStartup(ServletContext servletContext) {

    }

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        applicationProperties.getAllowCors().getMappings().forEach((key, value) -> registry
                .addMapping(key)
                .allowedOrigins(value)
                .allowedMethods(HttpMethod.GET.name(), HttpMethod.POST.name(), HttpMethod.PUT.name(), HttpMethod.DELETE.name()));
    }
}