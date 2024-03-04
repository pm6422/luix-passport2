package cn.luixtech.passport.server.service;

import org.jooq.TableLike;

public interface SeqNumberService {

    void init();

    long getNextSeqNumber(TableLike<?> table);
}
