package com.luixtech.sso.starter.session;

import com.luixtech.uidgenerator.core.id.IdGenerator;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.eis.SessionIdGenerator;

import java.io.Serializable;

public class TimestampSessionIdGenerator implements SessionIdGenerator {

    @Override
    public Serializable generateId(Session session) {
        return IdGenerator.generateId();
    }
}
