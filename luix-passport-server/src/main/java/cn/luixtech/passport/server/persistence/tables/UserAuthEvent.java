/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables;


import cn.luixtech.passport.server.persistence.Keys;
import cn.luixtech.passport.server.persistence.LuixPassport;
import cn.luixtech.passport.server.persistence.tables.records.UserAuthEventRecord;

import java.time.LocalDateTime;
import java.util.function.Function;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Function5;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Records;
import org.jooq.Row5;
import org.jooq.Schema;
import org.jooq.SelectField;
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
public class UserAuthEvent extends TableImpl<UserAuthEventRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>luix-passport.user_auth_event</code>
     */
    public static final UserAuthEvent USER_AUTH_EVENT = new UserAuthEvent();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<UserAuthEventRecord> getRecordType() {
        return UserAuthEventRecord.class;
    }

    /**
     * The column <code>luix-passport.user_auth_event.id</code>.
     */
    public final TableField<UserAuthEventRecord, String> ID = createField(DSL.name("id"), SQLDataType.VARCHAR(20).nullable(false), this, "");

    /**
     * The column <code>luix-passport.user_auth_event.user_id</code>.
     */
    public final TableField<UserAuthEventRecord, String> USER_ID = createField(DSL.name("user_id"), SQLDataType.VARCHAR(20).nullable(false), this, "");

    /**
     * The column <code>luix-passport.user_auth_event.event</code>.
     */
    public final TableField<UserAuthEventRecord, String> EVENT = createField(DSL.name("event"), SQLDataType.VARCHAR(36).nullable(false), this, "");

    /**
     * The column <code>luix-passport.user_auth_event.remark</code>.
     */
    public final TableField<UserAuthEventRecord, String> REMARK = createField(DSL.name("remark"), SQLDataType.VARCHAR(64), this, "");

    /**
     * The column <code>luix-passport.user_auth_event.created_time</code>.
     */
    public final TableField<UserAuthEventRecord, LocalDateTime> CREATED_TIME = createField(DSL.name("created_time"), SQLDataType.LOCALDATETIME(0).nullable(false), this, "");

    private UserAuthEvent(Name alias, Table<UserAuthEventRecord> aliased) {
        this(alias, aliased, null);
    }

    private UserAuthEvent(Name alias, Table<UserAuthEventRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>luix-passport.user_auth_event</code> table
     * reference
     */
    public UserAuthEvent(String alias) {
        this(DSL.name(alias), USER_AUTH_EVENT);
    }

    /**
     * Create an aliased <code>luix-passport.user_auth_event</code> table
     * reference
     */
    public UserAuthEvent(Name alias) {
        this(alias, USER_AUTH_EVENT);
    }

    /**
     * Create a <code>luix-passport.user_auth_event</code> table reference
     */
    public UserAuthEvent() {
        this(DSL.name("user_auth_event"), null);
    }

    public <O extends Record> UserAuthEvent(Table<O> child, ForeignKey<O, UserAuthEventRecord> key) {
        super(child, key, USER_AUTH_EVENT);
    }

    @Override
    public Schema getSchema() {
        return aliased() ? null : LuixPassport.LUIX_PASSPORT;
    }

    @Override
    public UniqueKey<UserAuthEventRecord> getPrimaryKey() {
        return Keys.KEY_USER_AUTH_EVENT_PRIMARY;
    }

    @Override
    public UserAuthEvent as(String alias) {
        return new UserAuthEvent(DSL.name(alias), this);
    }

    @Override
    public UserAuthEvent as(Name alias) {
        return new UserAuthEvent(alias, this);
    }

    @Override
    public UserAuthEvent as(Table<?> alias) {
        return new UserAuthEvent(alias.getQualifiedName(), this);
    }

    /**
     * Rename this table
     */
    @Override
    public UserAuthEvent rename(String name) {
        return new UserAuthEvent(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public UserAuthEvent rename(Name name) {
        return new UserAuthEvent(name, null);
    }

    /**
     * Rename this table
     */
    @Override
    public UserAuthEvent rename(Table<?> name) {
        return new UserAuthEvent(name.getQualifiedName(), null);
    }

    // -------------------------------------------------------------------------
    // Row5 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row5<String, String, String, String, LocalDateTime> fieldsRow() {
        return (Row5) super.fieldsRow();
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Function)}.
     */
    public <U> SelectField<U> mapping(Function5<? super String, ? super String, ? super String, ? super String, ? super LocalDateTime, ? extends U> from) {
        return convertFrom(Records.mapping(from));
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Class,
     * Function)}.
     */
    public <U> SelectField<U> mapping(Class<U> toType, Function5<? super String, ? super String, ? super String, ? super String, ? super LocalDateTime, ? extends U> from) {
        return convertFrom(toType, Records.mapping(from));
    }
}
