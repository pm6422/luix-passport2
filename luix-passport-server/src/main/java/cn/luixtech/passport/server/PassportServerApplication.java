package cn.luixtech.passport.server;

import com.luixtech.springbootframework.EnableLuixSpringBootFramework;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableLuixSpringBootFramework
public class PassportServerApplication {
    public static void main(String[] args) {
        // Disable jooq's self-ad message
        System.setProperty("org.jooq.no-logo", "true");
        SpringApplication.run(PassportServerApplication.class, args);
    }
}
