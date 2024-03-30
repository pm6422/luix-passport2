/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables;


import cn.luixtech.passport.server.persistence.Keys;
import cn.luixtech.passport.server.persistence.LuixPassport;
import cn.luixtech.passport.server.persistence.tables.records.UserRecord;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.TableOptions;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.SQLDataType;
import org.jooq.impl.TableImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class User extends TableImpl<UserRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>luix-passport.user</code>
     */
    public static final User USER = new User();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<UserRecord> getRecordType() {
        return UserRecord.class;
    }

    /**
     * The column <code>luix-passport.user.id</code>.
     */
    public final TableField<UserRecord, String> ID = createField(DSL.name("id"), SQLDataType.VARCHAR(20).nullable(false), this, "");

    /**
     * The column <code>luix-passport.user.username</code>.
     */
    public final TableField<UserRecord, String> USERNAME = createField(DSL.name("username"), SQLDataType.VARCHAR(20).nullable(false), this, "");

    /**
     * The column <code>luix-passport.user.email</code>.
     */
    public final TableField<UserRecord, String> EMAIL = createField(DSL.name("email"), SQLDataType.VARCHAR(30).nullable(false), this, "");

    /**
     * The column <code>luix-passport.user.mobile_no</code>.
     */
    public final TableField<UserRecord, String> MOBILE_NO = createField(DSL.name("mobile_no"), SQLDataType.VARCHAR(13).nullable(false), this, "");

    /**
     * The column <code>luix-passport.user.first_name</code>.
     */
    public final TableField<UserRecord, String> FIRST_NAME = createField(DSL.name("first_name"), SQLDataType.VARCHAR(20), this, "");

    /**
     * The column <code>luix-passport.user.last_name</code>.
     */
    public final TableField<UserRecord, String> LAST_NAME = createField(DSL.name("last_name"), SQLDataType.VARCHAR(20), this, "");

    /**
     * The column <code>luix-passport.user.password_hash</code>.
     */
    public final TableField<UserRecord, String> PASSWORD_HASH = createField(DSL.name("password_hash"), SQLDataType.VARCHAR(256).nullable(false), this, "");

    /**
     * The column <code>luix-passport.user.activation_code</code>.
     */
    public final TableField<UserRecord, String> ACTIVATION_CODE = createField(DSL.name("activation_code"), SQLDataType.VARCHAR(256), this, "");

    /**
     * The column <code>luix-passport.user.reset_code</code>.
     */
    public final TableField<UserRecord, String> RESET_CODE = createField(DSL.name("reset_code"), SQLDataType.VARCHAR(256), this, "");

    /**
     * The column <code>luix-passport.user.reset_time</code>.
     */
    public final TableField<UserRecord, LocalDateTime> RESET_TIME = createField(DSL.name("reset_time"), SQLDataType.LOCALDATETIME(0), this, "");

    /**
     * The column <code>luix-passport.user.profile_photo_enabled</code>.
     */
    public final TableField<UserRecord, Boolean> PROFILE_PHOTO_ENABLED = createField(DSL.name("profile_photo_enabled"), SQLDataType.BIT.nullable(false), this, "");

    /**
     * The column <code>luix-passport.user.remarks</code>.
     */
    public final TableField<UserRecord, String> REMARKS = createField(DSL.name("remarks"), SQLDataType.VARCHAR(256), this, "");

    /**
     * The column <code>luix-passport.user.activated</code>.
     */
    public final TableField<UserRecord, Boolean> ACTIVATED = createField(DSL.name("activated"), SQLDataType.BIT.nullable(false), this, "");

    /**
     * The column <code>luix-passport.user.enabled</code>.
     */
    public final TableField<UserRecord, Boolean> ENABLED = createField(DSL.name("enabled"), SQLDataType.BIT.nullable(false), this, "");

    /**
     * The column <code>luix-passport.user.account_expires_at</code>.
     */
    public final TableField<UserRecord, LocalDateTime> ACCOUNT_EXPIRES_AT = createField(DSL.name("account_expires_at"), SQLDataType.LOCALDATETIME(0), this, "");

    /**
     * The column <code>luix-passport.user.password_expires_at</code>.
     */
    public final TableField<UserRecord, LocalDateTime> PASSWORD_EXPIRES_AT = createField(DSL.name("password_expires_at"), SQLDataType.LOCALDATETIME(0), this, "");

    /**
     * The column <code>luix-passport.user.locale</code>.
     */
    public final TableField<UserRecord, String> LOCALE = createField(DSL.name("locale"), SQLDataType.VARCHAR(10).nullable(false), this, "");

    /**
     * The column <code>luix-passport.user.time_zone</code>.
     */
    public final TableField<UserRecord, String> TIME_ZONE = createField(DSL.name("time_zone"), SQLDataType.VARCHAR(30).nullable(false), this, "");

    /**
     * The column <code>luix-passport.user.date_format</code>.
     */
    public final TableField<UserRecord, String> DATE_FORMAT = createField(DSL.name("date_format"), SQLDataType.VARCHAR(20).nullable(false), this, "");

    /**
     * The column <code>luix-passport.user.created_by</code>.
     */
    public final TableField<UserRecord, String> CREATED_BY = createField(DSL.name("created_by"), SQLDataType.VARCHAR(50).nullable(false), this, "");

    /**
     * The column <code>luix-passport.user.created_at</code>.
     */
    public final TableField<UserRecord, LocalDateTime> CREATED_AT = createField(DSL.name("created_at"), SQLDataType.LOCALDATETIME(0).nullable(false), this, "");

    /**
     * The column <code>luix-passport.user.modified_by</code>.
     */
    public final TableField<UserRecord, String> MODIFIED_BY = createField(DSL.name("modified_by"), SQLDataType.VARCHAR(50), this, "");

    /**
     * The column <code>luix-passport.user.modified_at</code>.
     */
    public final TableField<UserRecord, LocalDateTime> MODIFIED_AT = createField(DSL.name("modified_at"), SQLDataType.LOCALDATETIME(0), this, "");

    private User(Name alias, Table<UserRecord> aliased) {
        this(alias, aliased, null);
    }

    private User(Name alias, Table<UserRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>luix-passport.user</code> table reference
     */
    public User(String alias) {
        this(DSL.name(alias), USER);
    }

    /**
     * Create an aliased <code>luix-passport.user</code> table reference
     */
    public User(Name alias) {
        this(alias, USER);
    }

    /**
     * Create a <code>luix-passport.user</code> table reference
     */
    public User() {
        this(DSL.name("user"), null);
    }

    public <O extends Record> User(Table<O> child, ForeignKey<O, UserRecord> key) {
        super(child, key, USER);
    }

    @Override
    public Schema getSchema() {
        return aliased() ? null : LuixPassport.LUIX_PASSPORT;
    }

    @Override
    public UniqueKey<UserRecord> getPrimaryKey() {
        return Keys.KEY_USER_PRIMARY;
    }

    @Override
    public List<UniqueKey<UserRecord>> getUniqueKeys() {
        return Arrays.asList(Keys.KEY_USER_USERNAME, Keys.KEY_USER_EMAIL, Keys.KEY_USER_MOBILE_NO);
    }

    @Override
    public User as(String alias) {
        return new User(DSL.name(alias), this);
    }

    @Override
    public User as(Name alias) {
        return new User(alias, this);
    }

    @Override
    public User as(Table<?> alias) {
        return new User(alias.getQualifiedName(), this);
    }

    /**
     * Rename this table
     */
    @Override
    public User rename(String name) {
        return new User(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public User rename(Name name) {
        return new User(name, null);
    }

    /**
     * Rename this table
     */
    @Override
    public User rename(Table<?> name) {
        return new User(name.getQualifiedName(), null);
    }
}
