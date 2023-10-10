package com.luixtech.sso.client;

import com.luixtech.springbootframework.EnableLuixSpringBootFramework;
import com.luixtech.sso.starter.config.EnableLuixSsoClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableLuixSpringBootFramework
@EnableLuixSsoClient
public class LuixSsoClientLauncher {

    /**
     * Entrance method which used to run the application. Spring profiles can be configured with a program arguments
     * --spring.profiles.active=your-active-profile
     *
     * @param args program arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(LuixSsoClientLauncher.class, args);
    }
}
