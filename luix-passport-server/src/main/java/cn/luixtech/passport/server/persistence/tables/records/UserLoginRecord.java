/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables.records;


import cn.luixtech.passport.server.persistence.tables.UserLogin;

import java.time.LocalDateTime;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record7;
import org.jooq.Row7;
import org.jooq.impl.UpdatableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class UserLoginRecord extends UpdatableRecordImpl<UserLoginRecord> implements Record7<String, String, LocalDateTime, String, String, String, String> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>luix-passport.user_login.id</code>.
     */
    public void setId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>luix-passport.user_login.id</code>.
     */
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>luix-passport.user_login.user_id</code>.
     */
    public void setUserId(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>luix-passport.user_login.user_id</code>.
     */
    public String getUserId() {
        return (String) get(1);
    }

    /**
     * Setter for <code>luix-passport.user_login.logged_time</code>.
     */
    public void setLoggedTime(LocalDateTime value) {
        set(2, value);
    }

    /**
     * Getter for <code>luix-passport.user_login.logged_time</code>.
     */
    public LocalDateTime getLoggedTime() {
        return (LocalDateTime) get(2);
    }

    /**
     * Setter for <code>luix-passport.user_login.location</code>.
     */
    public void setLocation(String value) {
        set(3, value);
    }

    /**
     * Getter for <code>luix-passport.user_login.location</code>.
     */
    public String getLocation() {
        return (String) get(3);
    }

    /**
     * Setter for <code>luix-passport.user_login.ip</code>.
     */
    public void setIp(String value) {
        set(4, value);
    }

    /**
     * Getter for <code>luix-passport.user_login.ip</code>.
     */
    public String getIp() {
        return (String) get(4);
    }

    /**
     * Setter for <code>luix-passport.user_login.os</code>.
     */
    public void setOs(String value) {
        set(5, value);
    }

    /**
     * Getter for <code>luix-passport.user_login.os</code>.
     */
    public String getOs() {
        return (String) get(5);
    }

    /**
     * Setter for <code>luix-passport.user_login.browser</code>.
     */
    public void setBrowser(String value) {
        set(6, value);
    }

    /**
     * Getter for <code>luix-passport.user_login.browser</code>.
     */
    public String getBrowser() {
        return (String) get(6);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record1<String> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record7 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row7<String, String, LocalDateTime, String, String, String, String> fieldsRow() {
        return (Row7) super.fieldsRow();
    }

    @Override
    public Row7<String, String, LocalDateTime, String, String, String, String> valuesRow() {
        return (Row7) super.valuesRow();
    }

    @Override
    public Field<String> field1() {
        return UserLogin.USER_LOGIN.ID;
    }

    @Override
    public Field<String> field2() {
        return UserLogin.USER_LOGIN.USER_ID;
    }

    @Override
    public Field<LocalDateTime> field3() {
        return UserLogin.USER_LOGIN.LOGGED_TIME;
    }

    @Override
    public Field<String> field4() {
        return UserLogin.USER_LOGIN.LOCATION;
    }

    @Override
    public Field<String> field5() {
        return UserLogin.USER_LOGIN.IP;
    }

    @Override
    public Field<String> field6() {
        return UserLogin.USER_LOGIN.OS;
    }

    @Override
    public Field<String> field7() {
        return UserLogin.USER_LOGIN.BROWSER;
    }

    @Override
    public String component1() {
        return getId();
    }

    @Override
    public String component2() {
        return getUserId();
    }

    @Override
    public LocalDateTime component3() {
        return getLoggedTime();
    }

    @Override
    public String component4() {
        return getLocation();
    }

    @Override
    public String component5() {
        return getIp();
    }

    @Override
    public String component6() {
        return getOs();
    }

    @Override
    public String component7() {
        return getBrowser();
    }

    @Override
    public String value1() {
        return getId();
    }

    @Override
    public String value2() {
        return getUserId();
    }

    @Override
    public LocalDateTime value3() {
        return getLoggedTime();
    }

    @Override
    public String value4() {
        return getLocation();
    }

    @Override
    public String value5() {
        return getIp();
    }

    @Override
    public String value6() {
        return getOs();
    }

    @Override
    public String value7() {
        return getBrowser();
    }

    @Override
    public UserLoginRecord value1(String value) {
        setId(value);
        return this;
    }

    @Override
    public UserLoginRecord value2(String value) {
        setUserId(value);
        return this;
    }

    @Override
    public UserLoginRecord value3(LocalDateTime value) {
        setLoggedTime(value);
        return this;
    }

    @Override
    public UserLoginRecord value4(String value) {
        setLocation(value);
        return this;
    }

    @Override
    public UserLoginRecord value5(String value) {
        setIp(value);
        return this;
    }

    @Override
    public UserLoginRecord value6(String value) {
        setOs(value);
        return this;
    }

    @Override
    public UserLoginRecord value7(String value) {
        setBrowser(value);
        return this;
    }

    @Override
    public UserLoginRecord values(String value1, String value2, LocalDateTime value3, String value4, String value5, String value6, String value7) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        value6(value6);
        value7(value7);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached UserLoginRecord
     */
    public UserLoginRecord() {
        super(UserLogin.USER_LOGIN);
    }

    /**
     * Create a detached, initialised UserLoginRecord
     */
    public UserLoginRecord(String id, String userId, LocalDateTime loggedTime, String location, String ip, String os, String browser) {
        super(UserLogin.USER_LOGIN);

        setId(id);
        setUserId(userId);
        setLoggedTime(loggedTime);
        setLocation(location);
        setIp(ip);
        setOs(os);
        setBrowser(browser);
        resetChangedOnNotNull();
    }
}
