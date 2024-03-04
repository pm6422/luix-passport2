package cn.luixtech.passport.server.component;

import cn.luixtech.passport.server.service.SeqNumberService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@Slf4j
public class InitSeqNumberAppRunner implements ApplicationRunner {
    private final SeqNumberService seqNumberService;

    @Override
    public void run(ApplicationArguments args) {
        seqNumberService.init();
    }
}
