package cn.luixtech.passport.server.controller;

import lombok.AllArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.charset.Charset;
import java.text.MessageFormat;

@RestController
@AllArgsConstructor
public class SystemController {

    @GetMapping(value = "/swagger-ui/index.css", produces = "text/css")
    public String getSwaggerIndexCss(@CookieValue(name = "theme_mode", defaultValue = "light") String themeMode) throws IOException {
        String path = MessageFormat.format("templates/swagger-ui/index-{0}.css", themeMode);
        return StreamUtils.copyToString(new ClassPathResource(path).getInputStream(), Charset.defaultCharset());
    }

    @GetMapping(value = "/swagger-ui/swagger-ui.css", produces = "text/css")
    public String getSwaggerUiCss(@CookieValue(name = "theme_mode", defaultValue = "light") String themeMode) throws IOException {
        String path = MessageFormat.format("templates/swagger-ui/swagger-ui-{0}.css", themeMode);
        return StreamUtils.copyToString(new ClassPathResource(path).getInputStream(), Charset.defaultCharset());
    }
}