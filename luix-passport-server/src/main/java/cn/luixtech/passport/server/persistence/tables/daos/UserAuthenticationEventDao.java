/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables.daos;


import cn.luixtech.passport.server.persistence.tables.UserAuthenticationEvent;
import cn.luixtech.passport.server.persistence.tables.records.UserAuthenticationEventRecord;

import java.time.LocalDateTime;
import java.util.List;

import org.jooq.Configuration;
import org.jooq.impl.DAOImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
@Repository
public class UserAuthenticationEventDao extends DAOImpl<UserAuthenticationEventRecord, cn.luixtech.passport.server.persistence.tables.pojos.UserAuthenticationEvent, String> {

    /**
     * Create a new UserAuthenticationEventDao without any configuration
     */
    public UserAuthenticationEventDao() {
        super(UserAuthenticationEvent.USER_AUTHENTICATION_EVENT, cn.luixtech.passport.server.persistence.tables.pojos.UserAuthenticationEvent.class);
    }

    /**
     * Create a new UserAuthenticationEventDao with an attached configuration
     */
    @Autowired
    public UserAuthenticationEventDao(Configuration configuration) {
        super(UserAuthenticationEvent.USER_AUTHENTICATION_EVENT, cn.luixtech.passport.server.persistence.tables.pojos.UserAuthenticationEvent.class, configuration);
    }

    @Override
    public String getId(cn.luixtech.passport.server.persistence.tables.pojos.UserAuthenticationEvent object) {
        return object.getId();
    }

    /**
     * Fetch records that have <code>id BETWEEN lowerInclusive AND upperInclusive</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.UserAuthenticationEvent> fetchRangeOfId(String lowerInclusive, String upperInclusive) {
        return fetchRange(UserAuthenticationEvent.USER_AUTHENTICATION_EVENT.ID, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>id IN (values)</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.UserAuthenticationEvent> fetchById(String... values) {
        return fetch(UserAuthenticationEvent.USER_AUTHENTICATION_EVENT.ID, values);
    }

    /**
     * Fetch a unique record that has <code>id = value</code>
     */
    public cn.luixtech.passport.server.persistence.tables.pojos.UserAuthenticationEvent fetchOneById(String value) {
        return fetchOne(UserAuthenticationEvent.USER_AUTHENTICATION_EVENT.ID, value);
    }

    /**
     * Fetch records that have <code>user_id BETWEEN lowerInclusive AND upperInclusive</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.UserAuthenticationEvent> fetchRangeOfUserId(String lowerInclusive, String upperInclusive) {
        return fetchRange(UserAuthenticationEvent.USER_AUTHENTICATION_EVENT.USER_ID, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>user_id IN (values)</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.UserAuthenticationEvent> fetchByUserId(String... values) {
        return fetch(UserAuthenticationEvent.USER_AUTHENTICATION_EVENT.USER_ID, values);
    }

    /**
     * Fetch records that have <code>event BETWEEN lowerInclusive AND upperInclusive</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.UserAuthenticationEvent> fetchRangeOfEvent(String lowerInclusive, String upperInclusive) {
        return fetchRange(UserAuthenticationEvent.USER_AUTHENTICATION_EVENT.EVENT, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>event IN (values)</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.UserAuthenticationEvent> fetchByEvent(String... values) {
        return fetch(UserAuthenticationEvent.USER_AUTHENTICATION_EVENT.EVENT, values);
    }

    /**
     * Fetch records that have <code>description BETWEEN lowerInclusive AND upperInclusive</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.UserAuthenticationEvent> fetchRangeOfDescription(String lowerInclusive, String upperInclusive) {
        return fetchRange(UserAuthenticationEvent.USER_AUTHENTICATION_EVENT.DESCRIPTION, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>description IN (values)</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.UserAuthenticationEvent> fetchByDescription(String... values) {
        return fetch(UserAuthenticationEvent.USER_AUTHENTICATION_EVENT.DESCRIPTION, values);
    }

    /**
     * Fetch records that have <code>created_time BETWEEN lowerInclusive AND upperInclusive</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.UserAuthenticationEvent> fetchRangeOfCreatedTime(LocalDateTime lowerInclusive, LocalDateTime upperInclusive) {
        return fetchRange(UserAuthenticationEvent.USER_AUTHENTICATION_EVENT.CREATED_TIME, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>created_time IN (values)</code>
     */
    public List<cn.luixtech.passport.server.persistence.tables.pojos.UserAuthenticationEvent> fetchByCreatedTime(LocalDateTime... values) {
        return fetch(UserAuthenticationEvent.USER_AUTHENTICATION_EVENT.CREATED_TIME, values);
    }
}
