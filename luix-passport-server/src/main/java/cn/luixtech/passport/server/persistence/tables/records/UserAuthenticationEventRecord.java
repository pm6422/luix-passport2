/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables.records;


import cn.luixtech.passport.server.persistence.tables.UserAuthenticationEvent;

import java.time.LocalDateTime;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record5;
import org.jooq.Row5;
import org.jooq.impl.UpdatableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class UserAuthenticationEventRecord extends UpdatableRecordImpl<UserAuthenticationEventRecord> implements Record5<String, String, String, String, LocalDateTime> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>luix-passport.user_authentication_event.id</code>.
     */
    public void setId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>luix-passport.user_authentication_event.id</code>.
     */
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>luix-passport.user_authentication_event.user_id</code>.
     */
    public void setUserId(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>luix-passport.user_authentication_event.user_id</code>.
     */
    public String getUserId() {
        return (String) get(1);
    }

    /**
     * Setter for <code>luix-passport.user_authentication_event.event</code>.
     */
    public void setEvent(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>luix-passport.user_authentication_event.event</code>.
     */
    public String getEvent() {
        return (String) get(2);
    }

    /**
     * Setter for <code>luix-passport.user_authentication_event.remark</code>.
     */
    public void setRemark(String value) {
        set(3, value);
    }

    /**
     * Getter for <code>luix-passport.user_authentication_event.remark</code>.
     */
    public String getRemark() {
        return (String) get(3);
    }

    /**
     * Setter for
     * <code>luix-passport.user_authentication_event.created_time</code>.
     */
    public void setCreatedTime(LocalDateTime value) {
        set(4, value);
    }

    /**
     * Getter for
     * <code>luix-passport.user_authentication_event.created_time</code>.
     */
    public LocalDateTime getCreatedTime() {
        return (LocalDateTime) get(4);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record1<String> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record5 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row5<String, String, String, String, LocalDateTime> fieldsRow() {
        return (Row5) super.fieldsRow();
    }

    @Override
    public Row5<String, String, String, String, LocalDateTime> valuesRow() {
        return (Row5) super.valuesRow();
    }

    @Override
    public Field<String> field1() {
        return UserAuthenticationEvent.USER_AUTHENTICATION_EVENT.ID;
    }

    @Override
    public Field<String> field2() {
        return UserAuthenticationEvent.USER_AUTHENTICATION_EVENT.USER_ID;
    }

    @Override
    public Field<String> field3() {
        return UserAuthenticationEvent.USER_AUTHENTICATION_EVENT.EVENT;
    }

    @Override
    public Field<String> field4() {
        return UserAuthenticationEvent.USER_AUTHENTICATION_EVENT.REMARK;
    }

    @Override
    public Field<LocalDateTime> field5() {
        return UserAuthenticationEvent.USER_AUTHENTICATION_EVENT.CREATED_TIME;
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
    public String component3() {
        return getEvent();
    }

    @Override
    public String component4() {
        return getRemark();
    }

    @Override
    public LocalDateTime component5() {
        return getCreatedTime();
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
    public String value3() {
        return getEvent();
    }

    @Override
    public String value4() {
        return getRemark();
    }

    @Override
    public LocalDateTime value5() {
        return getCreatedTime();
    }

    @Override
    public UserAuthenticationEventRecord value1(String value) {
        setId(value);
        return this;
    }

    @Override
    public UserAuthenticationEventRecord value2(String value) {
        setUserId(value);
        return this;
    }

    @Override
    public UserAuthenticationEventRecord value3(String value) {
        setEvent(value);
        return this;
    }

    @Override
    public UserAuthenticationEventRecord value4(String value) {
        setRemark(value);
        return this;
    }

    @Override
    public UserAuthenticationEventRecord value5(LocalDateTime value) {
        setCreatedTime(value);
        return this;
    }

    @Override
    public UserAuthenticationEventRecord values(String value1, String value2, String value3, String value4, LocalDateTime value5) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached UserAuthenticationEventRecord
     */
    public UserAuthenticationEventRecord() {
        super(UserAuthenticationEvent.USER_AUTHENTICATION_EVENT);
    }

    /**
     * Create a detached, initialised UserAuthenticationEventRecord
     */
    public UserAuthenticationEventRecord(String id, String userId, String event, String remark, LocalDateTime createdTime) {
        super(UserAuthenticationEvent.USER_AUTHENTICATION_EVENT);

        setId(id);
        setUserId(userId);
        setEvent(event);
        setRemark(remark);
        setCreatedTime(createdTime);
        resetChangedOnNotNull();
    }

    /**
     * Create a detached, initialised UserAuthenticationEventRecord
     */
    public UserAuthenticationEventRecord(cn.luixtech.passport.server.persistence.tables.pojos.UserAuthenticationEvent value) {
        super(UserAuthenticationEvent.USER_AUTHENTICATION_EVENT);

        if (value != null) {
            setId(value.getId());
            setUserId(value.getUserId());
            setEvent(value.getEvent());
            setRemark(value.getRemark());
            setCreatedTime(value.getCreatedTime());
            resetChangedOnNotNull();
        }
    }
}
