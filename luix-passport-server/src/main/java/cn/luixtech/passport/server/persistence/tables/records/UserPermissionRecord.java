/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables.records;


import cn.luixtech.passport.server.persistence.tables.UserPermission;

import org.jooq.Field;
import org.jooq.Record2;
import org.jooq.Row2;
import org.jooq.impl.UpdatableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class UserPermissionRecord extends UpdatableRecordImpl<UserPermissionRecord> implements Record2<String, String> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>luix-passport2.user_permission.user_id</code>.
     */
    public void setUserId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>luix-passport2.user_permission.user_id</code>.
     */
    public String getUserId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>luix-passport2.user_permission.permission</code>.
     */
    public void setPermission(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>luix-passport2.user_permission.permission</code>.
     */
    public String getPermission() {
        return (String) get(1);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record2<String, String> key() {
        return (Record2) super.key();
    }

    // -------------------------------------------------------------------------
    // Record2 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row2<String, String> fieldsRow() {
        return (Row2) super.fieldsRow();
    }

    @Override
    public Row2<String, String> valuesRow() {
        return (Row2) super.valuesRow();
    }

    @Override
    public Field<String> field1() {
        return UserPermission.USER_PERMISSION.USER_ID;
    }

    @Override
    public Field<String> field2() {
        return UserPermission.USER_PERMISSION.PERMISSION;
    }

    @Override
    public String component1() {
        return getUserId();
    }

    @Override
    public String component2() {
        return getPermission();
    }

    @Override
    public String value1() {
        return getUserId();
    }

    @Override
    public String value2() {
        return getPermission();
    }

    @Override
    public UserPermissionRecord value1(String value) {
        setUserId(value);
        return this;
    }

    @Override
    public UserPermissionRecord value2(String value) {
        setPermission(value);
        return this;
    }

    @Override
    public UserPermissionRecord values(String value1, String value2) {
        value1(value1);
        value2(value2);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached UserPermissionRecord
     */
    public UserPermissionRecord() {
        super(UserPermission.USER_PERMISSION);
    }

    /**
     * Create a detached, initialised UserPermissionRecord
     */
    public UserPermissionRecord(String userId, String permission) {
        super(UserPermission.USER_PERMISSION);

        setUserId(userId);
        setPermission(permission);
    }
}
