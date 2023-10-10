package com.luixtech.sso.starter.auth;

import lombok.AllArgsConstructor;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.eis.CachingSessionDAO;
import org.springframework.data.redis.core.RedisTemplate;

import java.io.Serializable;
import java.util.concurrent.TimeUnit;

/**
 * Custom session persistence implementation, Shiro extension for cluster sharing
 */
@AllArgsConstructor
public class RedisSessionDao extends CachingSessionDAO {
    public static final  String                               PREFIX = "SSO_";
    private static final long                                 EXPIRE = TimeUnit.DAYS.toSeconds(1);
    private final        RedisTemplate<Serializable, Session> redisTemplate;


    /**
     * shiro When creating a session, save the session to redis
     *
     * @param session session
     * @return session ID
     */
    @Override
    protected Serializable doCreate(Session session) {
        //Generate SessionID
        Serializable serializable = this.generateSessionId(session);
        assignSessionId(session, serializable);
        //Store the session id as the Key and the session as the value in redis
        redisTemplate.opsForValue().set(PREFIX + serializable, session);
        return serializable;
    }

    /**
     * When the user maintains the session, refresh the effective time of the session
     *
     * @param session session
     */
    @Override
    protected void doUpdate(Session session) {
        //Set session validity
        session.setTimeout(EXPIRE * 1000);
        //Store the session id as the Key and the session as the value in redis, and set the validity period
        redisTemplate.opsForValue().set(PREFIX + session.getId(), session, EXPIRE, TimeUnit.SECONDS);
    }

    /**
     * When the user logs off or the session expires, the session is deleted from redis
     *
     * @param session session
     */
    @Override
    protected void doDelete(Session session) {
        //null validation
        if (session == null) {
            return;
        }
        //Delete the k-v of the specified SessionId from Redis
        redisTemplate.delete(PREFIX + session.getId());
    }

    /**
     * shiro Obtain the Session object through sessionId and redis
     *
     * @param sessionId session ID
     * @return session
     */
    @Override
    protected Session doReadSession(Serializable sessionId) {
        if (sessionId == null) {
            return null;
        }
        //Read Session object from Redis
        return redisTemplate.opsForValue().get(PREFIX + sessionId);
    }
}

