/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables;


import cn.luixtech.passport.server.persistence.Keys;
import cn.luixtech.passport.server.persistence.LuixPassport;
import cn.luixtech.passport.server.persistence.tables.records.Oauth2RegisteredClientRecord;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Row13;
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
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Oauth2RegisteredClient extends TableImpl<Oauth2RegisteredClientRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>luix-passport.oauth2_registered_client</code>
     */
    public static final Oauth2RegisteredClient OAUTH2_REGISTERED_CLIENT = new Oauth2RegisteredClient();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<Oauth2RegisteredClientRecord> getRecordType() {
        return Oauth2RegisteredClientRecord.class;
    }

    /**
     * The column <code>luix-passport.oauth2_registered_client.id</code>.
     */
    public final TableField<Oauth2RegisteredClientRecord, String> ID = createField(DSL.name("id"), SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * The column <code>luix-passport.oauth2_registered_client.client_id</code>.
     */
    public final TableField<Oauth2RegisteredClientRecord, String> CLIENT_ID = createField(DSL.name("client_id"), SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * The column <code>luix-passport.oauth2_registered_client.client_id_issued_at</code>.
     */
    public final TableField<Oauth2RegisteredClientRecord, LocalDateTime> CLIENT_ID_ISSUED_AT = createField(DSL.name("client_id_issued_at"), SQLDataType.LOCALDATETIME(0).nullable(false).defaultValue(DSL.field("CURRENT_TIMESTAMP", SQLDataType.LOCALDATETIME)), this, "");

    /**
     * The column <code>luix-passport.oauth2_registered_client.client_secret</code>.
     */
    public final TableField<Oauth2RegisteredClientRecord, String> CLIENT_SECRET = createField(DSL.name("client_secret"), SQLDataType.VARCHAR(200), this, "");

    /**
     * The column <code>luix-passport.oauth2_registered_client.client_secret_expires_at</code>.
     */
    public final TableField<Oauth2RegisteredClientRecord, LocalDateTime> CLIENT_SECRET_EXPIRES_AT = createField(DSL.name("client_secret_expires_at"), SQLDataType.LOCALDATETIME(0), this, "");

    /**
     * The column <code>luix-passport.oauth2_registered_client.client_name</code>.
     */
    public final TableField<Oauth2RegisteredClientRecord, String> CLIENT_NAME = createField(DSL.name("client_name"), SQLDataType.VARCHAR(200).nullable(false), this, "");

    /**
     * The column <code>luix-passport.oauth2_registered_client.client_authentication_methods</code>.
     */
    public final TableField<Oauth2RegisteredClientRecord, String> CLIENT_AUTHENTICATION_METHODS = createField(DSL.name("client_authentication_methods"), SQLDataType.VARCHAR(1000).nullable(false), this, "");

    /**
     * The column <code>luix-passport.oauth2_registered_client.authorization_grant_types</code>.
     */
    public final TableField<Oauth2RegisteredClientRecord, String> AUTHORIZATION_GRANT_TYPES = createField(DSL.name("authorization_grant_types"), SQLDataType.VARCHAR(1000).nullable(false), this, "");

    /**
     * The column <code>luix-passport.oauth2_registered_client.redirect_uris</code>.
     */
    public final TableField<Oauth2RegisteredClientRecord, String> REDIRECT_URIS = createField(DSL.name("redirect_uris"), SQLDataType.VARCHAR(1000), this, "");

    /**
     * The column <code>luix-passport.oauth2_registered_client.post_logout_redirect_uris</code>.
     */
    public final TableField<Oauth2RegisteredClientRecord, String> POST_LOGOUT_REDIRECT_URIS = createField(DSL.name("post_logout_redirect_uris"), SQLDataType.VARCHAR(1000), this, "");

    /**
     * The column <code>luix-passport.oauth2_registered_client.scopes</code>.
     */
    public final TableField<Oauth2RegisteredClientRecord, String> SCOPES = createField(DSL.name("scopes"), SQLDataType.VARCHAR(1000).nullable(false), this, "");

    /**
     * The column <code>luix-passport.oauth2_registered_client.client_settings</code>.
     */
    public final TableField<Oauth2RegisteredClientRecord, String> CLIENT_SETTINGS = createField(DSL.name("client_settings"), SQLDataType.VARCHAR(2000).nullable(false), this, "");

    /**
     * The column <code>luix-passport.oauth2_registered_client.token_settings</code>.
     */
    public final TableField<Oauth2RegisteredClientRecord, String> TOKEN_SETTINGS = createField(DSL.name("token_settings"), SQLDataType.VARCHAR(2000).nullable(false), this, "");

    private Oauth2RegisteredClient(Name alias, Table<Oauth2RegisteredClientRecord> aliased) {
        this(alias, aliased, null);
    }

    private Oauth2RegisteredClient(Name alias, Table<Oauth2RegisteredClientRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>luix-passport.oauth2_registered_client</code> table reference
     */
    public Oauth2RegisteredClient(String alias) {
        this(DSL.name(alias), OAUTH2_REGISTERED_CLIENT);
    }

    /**
     * Create an aliased <code>luix-passport.oauth2_registered_client</code> table reference
     */
    public Oauth2RegisteredClient(Name alias) {
        this(alias, OAUTH2_REGISTERED_CLIENT);
    }

    /**
     * Create a <code>luix-passport.oauth2_registered_client</code> table reference
     */
    public Oauth2RegisteredClient() {
        this(DSL.name("oauth2_registered_client"), null);
    }

    public <O extends Record> Oauth2RegisteredClient(Table<O> child, ForeignKey<O, Oauth2RegisteredClientRecord> key) {
        super(child, key, OAUTH2_REGISTERED_CLIENT);
    }

    @Override
    public Schema getSchema() {
        return LuixPassport.LUIX_PASSPORT;
    }

    @Override
    public UniqueKey<Oauth2RegisteredClientRecord> getPrimaryKey() {
        return Keys.KEY_OAUTH2_REGISTERED_CLIENT_PRIMARY;
    }

    @Override
    public List<UniqueKey<Oauth2RegisteredClientRecord>> getKeys() {
        return Arrays.<UniqueKey<Oauth2RegisteredClientRecord>>asList(Keys.KEY_OAUTH2_REGISTERED_CLIENT_PRIMARY);
    }

    @Override
    public Oauth2RegisteredClient as(String alias) {
        return new Oauth2RegisteredClient(DSL.name(alias), this);
    }

    @Override
    public Oauth2RegisteredClient as(Name alias) {
        return new Oauth2RegisteredClient(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public Oauth2RegisteredClient rename(String name) {
        return new Oauth2RegisteredClient(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public Oauth2RegisteredClient rename(Name name) {
        return new Oauth2RegisteredClient(name, null);
    }

    // -------------------------------------------------------------------------
    // Row13 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row13<String, String, LocalDateTime, String, LocalDateTime, String, String, String, String, String, String, String, String> fieldsRow() {
        return (Row13) super.fieldsRow();
    }
}
