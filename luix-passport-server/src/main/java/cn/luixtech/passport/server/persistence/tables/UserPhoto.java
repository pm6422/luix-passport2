/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables;


import cn.luixtech.passport.server.persistence.Keys;
import cn.luixtech.passport.server.persistence.LuixPassport;
import cn.luixtech.passport.server.persistence.tables.records.UserPhotoRecord;

import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Function2;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Records;
import org.jooq.Row2;
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
public class UserPhoto extends TableImpl<UserPhotoRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>luix-passport.user_photo</code>
     */
    public static final UserPhoto USER_PHOTO = new UserPhoto();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<UserPhotoRecord> getRecordType() {
        return UserPhotoRecord.class;
    }

    /**
     * The column <code>luix-passport.user_photo.id</code>.
     */
    public final TableField<UserPhotoRecord, String> ID = createField(DSL.name("id"), SQLDataType.VARCHAR(20).nullable(false), this, "");

    /**
     * The column <code>luix-passport.user_photo.photo</code>.
     */
    public final TableField<UserPhotoRecord, byte[]> PHOTO = createField(DSL.name("photo"), SQLDataType.BLOB.nullable(false), this, "");

    private UserPhoto(Name alias, Table<UserPhotoRecord> aliased) {
        this(alias, aliased, null);
    }

    private UserPhoto(Name alias, Table<UserPhotoRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>luix-passport.user_photo</code> table reference
     */
    public UserPhoto(String alias) {
        this(DSL.name(alias), USER_PHOTO);
    }

    /**
     * Create an aliased <code>luix-passport.user_photo</code> table reference
     */
    public UserPhoto(Name alias) {
        this(alias, USER_PHOTO);
    }

    /**
     * Create a <code>luix-passport.user_photo</code> table reference
     */
    public UserPhoto() {
        this(DSL.name("user_photo"), null);
    }

    public <O extends Record> UserPhoto(Table<O> child, ForeignKey<O, UserPhotoRecord> key) {
        super(child, key, USER_PHOTO);
    }

    @Override
    public Schema getSchema() {
        return aliased() ? null : LuixPassport.LUIX_PASSPORT;
    }

    @Override
    public UniqueKey<UserPhotoRecord> getPrimaryKey() {
        return Keys.KEY_USER_PHOTO_PRIMARY;
    }

    @Override
    public List<ForeignKey<UserPhotoRecord, ?>> getReferences() {
        return Arrays.asList(Keys.FK_USER_PHOTO_USER_ID);
    }

    private transient User _user;

    /**
     * Get the implicit join path to the <code>luix-passport.user</code> table.
     */
    public User user() {
        if (_user == null)
            _user = new User(this, Keys.FK_USER_PHOTO_USER_ID);

        return _user;
    }

    @Override
    public UserPhoto as(String alias) {
        return new UserPhoto(DSL.name(alias), this);
    }

    @Override
    public UserPhoto as(Name alias) {
        return new UserPhoto(alias, this);
    }

    @Override
    public UserPhoto as(Table<?> alias) {
        return new UserPhoto(alias.getQualifiedName(), this);
    }

    /**
     * Rename this table
     */
    @Override
    public UserPhoto rename(String name) {
        return new UserPhoto(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public UserPhoto rename(Name name) {
        return new UserPhoto(name, null);
    }

    /**
     * Rename this table
     */
    @Override
    public UserPhoto rename(Table<?> name) {
        return new UserPhoto(name.getQualifiedName(), null);
    }

    // -------------------------------------------------------------------------
    // Row2 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row2<String, byte[]> fieldsRow() {
        return (Row2) super.fieldsRow();
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Function)}.
     */
    public <U> SelectField<U> mapping(Function2<? super String, ? super byte[], ? extends U> from) {
        return convertFrom(Records.mapping(from));
    }

    /**
     * Convenience mapping calling {@link SelectField#convertFrom(Class,
     * Function)}.
     */
    public <U> SelectField<U> mapping(Class<U> toType, Function2<? super String, ? super byte[], ? extends U> from) {
        return convertFrom(toType, Records.mapping(from));
    }
}
