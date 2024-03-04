package cn.luixtech.passport.server.service;

public interface SeqNumberService {

    void init();

    long getNextSeqNumber(String table);
}
