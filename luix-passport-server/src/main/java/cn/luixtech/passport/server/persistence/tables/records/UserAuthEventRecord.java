/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables.records;


import cn.luixtech.passport.server.persistence.tables.UserAuthEvent;

import java.time.LocalDateTime;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record6;
import org.jooq.Row6;
import org.jooq.impl.UpdatableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class UserAuthEventRecord extends UpdatableRecordImpl<UserAuthEventRecord> implements Record6<String, String, String, String, LocalDateTime, String> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>luix-passport.user_auth_event.id</code>.
     */
    public void setId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>luix-passport.user_auth_event.id</code>.
     */
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>luix-passport.user_auth_event.user_id</code>.
     */
    public void setUserId(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>luix-passport.user_auth_event.user_id</code>.
     */
    public String getUserId() {
        return (String) get(1);
    }

    /**
     * Setter for <code>luix-passport.user_auth_event.event</code>.
     */
    public void setEvent(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>luix-passport.user_auth_event.event</code>.
     */
    public String getEvent() {
        return (String) get(2);
    }

    /**
     * Setter for <code>luix-passport.user_auth_event.remark</code>.
     */
    public void setRemark(String value) {
        set(3, value);
    }

    /**
     * Getter for <code>luix-passport.user_auth_event.remark</code>.
     */
    public String getRemark() {
        return (String) get(3);
    }

    /**
     * Setter for <code>luix-passport.user_auth_event.created_at</code>.
     */
    public void setCreatedAt(LocalDateTime value) {
        set(4, value);
    }

    /**
     * Getter for <code>luix-passport.user_auth_event.created_at</code>.
     */
    public LocalDateTime getCreatedAt() {
        return (LocalDateTime) get(4);
    }

    /**
     * Setter for <code>luix-passport.user_auth_event.created_by</code>.
     */
    public void setCreatedBy(String value) {
        set(5, value);
    }

    /**
     * Getter for <code>luix-passport.user_auth_event.created_by</code>.
     */
    public String getCreatedBy() {
        return (String) get(5);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record1<String> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record6 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row6<String, String, String, String, LocalDateTime, String> fieldsRow() {
        return (Row6) super.fieldsRow();
    }

    @Override
    public Row6<String, String, String, String, LocalDateTime, String> valuesRow() {
        return (Row6) super.valuesRow();
    }

    @Override
    public Field<String> field1() {
        return UserAuthEvent.USER_AUTH_EVENT.ID;
    }

    @Override
    public Field<String> field2() {
        return UserAuthEvent.USER_AUTH_EVENT.USER_ID;
    }

    @Override
    public Field<String> field3() {
        return UserAuthEvent.USER_AUTH_EVENT.EVENT;
    }

    @Override
    public Field<String> field4() {
        return UserAuthEvent.USER_AUTH_EVENT.REMARK;
    }

    @Override
    public Field<LocalDateTime> field5() {
        return UserAuthEvent.USER_AUTH_EVENT.CREATED_AT;
    }

    @Override
    public Field<String> field6() {
        return UserAuthEvent.USER_AUTH_EVENT.CREATED_BY;
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
        return getCreatedAt();
    }

    @Override
    public String component6() {
        return getCreatedBy();
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
        return getCreatedAt();
    }

    @Override
    public String value6() {
        return getCreatedBy();
    }

    @Override
    public UserAuthEventRecord value1(String value) {
        setId(value);
        return this;
    }

    @Override
    public UserAuthEventRecord value2(String value) {
        setUserId(value);
        return this;
    }

    @Override
    public UserAuthEventRecord value3(String value) {
        setEvent(value);
        return this;
    }

    @Override
    public UserAuthEventRecord value4(String value) {
        setRemark(value);
        return this;
    }

    @Override
    public UserAuthEventRecord value5(LocalDateTime value) {
        setCreatedAt(value);
        return this;
    }

    @Override
    public UserAuthEventRecord value6(String value) {
        setCreatedBy(value);
        return this;
    }

    @Override
    public UserAuthEventRecord values(String value1, String value2, String value3, String value4, LocalDateTime value5, String value6) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        value6(value6);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached UserAuthEventRecord
     */
    public UserAuthEventRecord() {
        super(UserAuthEvent.USER_AUTH_EVENT);
    }

    /**
     * Create a detached, initialised UserAuthEventRecord
     */
    public UserAuthEventRecord(String id, String userId, String event, String remark, LocalDateTime createdAt, String createdBy) {
        super(UserAuthEvent.USER_AUTH_EVENT);

        setId(id);
        setUserId(userId);
        setEvent(event);
        setRemark(remark);
        setCreatedAt(createdAt);
        setCreatedBy(createdBy);
        resetChangedOnNotNull();
    }
}
