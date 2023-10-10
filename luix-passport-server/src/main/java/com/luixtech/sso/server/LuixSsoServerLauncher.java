package com.luixtech.sso.server;

import com.luixtech.springbootframework.EnableLuixSpringBootFramework;
import com.luixtech.sso.starter.config.EnableLuixSsoServer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableLuixSpringBootFramework
@EnableLuixSsoServer
public class LuixSsoServerLauncher {

    /**
     * Entrance method which used to run the application. Spring profiles can be configured with a program arguments
     * --spring.profiles.active=your-active-profile
     *
     * @param args program arguments
     */
    public static void main(String[] args) {
        // Disable jooq's self-ad message
        System.setProperty("org.jooq.no-logo", "true");
        SpringApplication.run(LuixSsoServerLauncher.class, args);
    }
}
