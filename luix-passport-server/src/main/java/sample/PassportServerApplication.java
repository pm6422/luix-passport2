package sample;

import com.luixtech.springbootframework.EnableLuixSpringBootFramework;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableLuixSpringBootFramework
public class PassportServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(PassportServerApplication.class, args);
    }

}
