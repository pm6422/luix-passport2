/*
 * This file is generated by jOOQ.
 */
package com.luixtech.sso.server.persistence.tables.daos;


import com.luixtech.sso.server.persistence.tables.UserRole;
import com.luixtech.sso.server.persistence.tables.records.UserRoleRecord;

import java.util.List;

import org.jooq.Configuration;
import org.jooq.Record2;
import org.jooq.impl.DAOImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
@Repository
public class UserRoleDao extends DAOImpl<UserRoleRecord, com.luixtech.sso.server.persistence.tables.pojos.UserRole, Record2<String, String>> {

    /**
     * Create a new UserRoleDao without any configuration
     */
    public UserRoleDao() {
        super(UserRole.USER_ROLE, com.luixtech.sso.server.persistence.tables.pojos.UserRole.class);
    }

    /**
     * Create a new UserRoleDao with an attached configuration
     */
    @Autowired
    public UserRoleDao(Configuration configuration) {
        super(UserRole.USER_ROLE, com.luixtech.sso.server.persistence.tables.pojos.UserRole.class, configuration);
    }

    @Override
    public Record2<String, String> getId(com.luixtech.sso.server.persistence.tables.pojos.UserRole object) {
        return compositeKeyRecord(object.getUserId(), object.getRole());
    }

    /**
     * Fetch records that have <code>user_id BETWEEN lowerInclusive AND upperInclusive</code>
     */
    public List<com.luixtech.sso.server.persistence.tables.pojos.UserRole> fetchRangeOfUserId(String lowerInclusive, String upperInclusive) {
        return fetchRange(UserRole.USER_ROLE.USER_ID, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>user_id IN (values)</code>
     */
    public List<com.luixtech.sso.server.persistence.tables.pojos.UserRole> fetchByUserId(String... values) {
        return fetch(UserRole.USER_ROLE.USER_ID, values);
    }

    /**
     * Fetch records that have <code>role BETWEEN lowerInclusive AND upperInclusive</code>
     */
    public List<com.luixtech.sso.server.persistence.tables.pojos.UserRole> fetchRangeOfRole(String lowerInclusive, String upperInclusive) {
        return fetchRange(UserRole.USER_ROLE.ROLE, lowerInclusive, upperInclusive);
    }

    /**
     * Fetch records that have <code>role IN (values)</code>
     */
    public List<com.luixtech.sso.server.persistence.tables.pojos.UserRole> fetchByRole(String... values) {
        return fetch(UserRole.USER_ROLE.ROLE, values);
    }
}
