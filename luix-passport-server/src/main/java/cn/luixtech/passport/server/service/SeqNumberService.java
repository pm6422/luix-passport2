package cn.luixtech.passport.server.service;

import org.jooq.Table;

public interface SeqNumberService {

    void init();

    long getNextSeqNumber(Table table);
}
