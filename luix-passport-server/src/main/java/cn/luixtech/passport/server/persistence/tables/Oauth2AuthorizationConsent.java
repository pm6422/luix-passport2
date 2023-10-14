/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables;


import cn.luixtech.passport.server.persistence.Keys;
import cn.luixtech.passport.server.persistence.LuixPassport;
import cn.luixtech.passport.server.persistence.tables.records.Oauth2AuthorizationConsentRecord;

import java.util.Arrays;
import java.util.List;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Row3;
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
public class Oauth2AuthorizationConsent extends TableImpl<Oauth2AuthorizationConsentRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>luix-passport.oauth2_authorization_consent</code>
     */
    public static final Oauth2AuthorizationConsent OAUTH2_AUTHORIZATION_CONSENT = new Oauth2AuthorizationConsent();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<Oauth2AuthorizationConsentRecord> getRecordType() {
        return Oauth2AuthorizationConsentRecord.class;
    }

    /**
     * The column <code>luix-passport.oauth2_authorization_consent.registered_client_id</code>.
     */
    public final TableField<Oauth2AuthorizationConsentRecord, String> REGISTERED_CLIENT_ID = createField(DSL.name("registered_client_id"), SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * The column <code>luix-passport.oauth2_authorization_consent.principal_name</code>.
     */
    public final TableField<Oauth2AuthorizationConsentRecord, String> PRINCIPAL_NAME = createField(DSL.name("principal_name"), SQLDataType.VARCHAR(200).nullable(false), this, "");

    /**
     * The column <code>luix-passport.oauth2_authorization_consent.authorities</code>.
     */
    public final TableField<Oauth2AuthorizationConsentRecord, String> AUTHORITIES = createField(DSL.name("authorities"), SQLDataType.VARCHAR(1000).nullable(false), this, "");

    private Oauth2AuthorizationConsent(Name alias, Table<Oauth2AuthorizationConsentRecord> aliased) {
        this(alias, aliased, null);
    }

    private Oauth2AuthorizationConsent(Name alias, Table<Oauth2AuthorizationConsentRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>luix-passport.oauth2_authorization_consent</code> table reference
     */
    public Oauth2AuthorizationConsent(String alias) {
        this(DSL.name(alias), OAUTH2_AUTHORIZATION_CONSENT);
    }

    /**
     * Create an aliased <code>luix-passport.oauth2_authorization_consent</code> table reference
     */
    public Oauth2AuthorizationConsent(Name alias) {
        this(alias, OAUTH2_AUTHORIZATION_CONSENT);
    }

    /**
     * Create a <code>luix-passport.oauth2_authorization_consent</code> table reference
     */
    public Oauth2AuthorizationConsent() {
        this(DSL.name("oauth2_authorization_consent"), null);
    }

    public <O extends Record> Oauth2AuthorizationConsent(Table<O> child, ForeignKey<O, Oauth2AuthorizationConsentRecord> key) {
        super(child, key, OAUTH2_AUTHORIZATION_CONSENT);
    }

    @Override
    public Schema getSchema() {
        return LuixPassport.LUIX_PASSPORT;
    }

    @Override
    public UniqueKey<Oauth2AuthorizationConsentRecord> getPrimaryKey() {
        return Keys.KEY_OAUTH2_AUTHORIZATION_CONSENT_PRIMARY;
    }

    @Override
    public List<UniqueKey<Oauth2AuthorizationConsentRecord>> getKeys() {
        return Arrays.<UniqueKey<Oauth2AuthorizationConsentRecord>>asList(Keys.KEY_OAUTH2_AUTHORIZATION_CONSENT_PRIMARY);
    }

    @Override
    public Oauth2AuthorizationConsent as(String alias) {
        return new Oauth2AuthorizationConsent(DSL.name(alias), this);
    }

    @Override
    public Oauth2AuthorizationConsent as(Name alias) {
        return new Oauth2AuthorizationConsent(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public Oauth2AuthorizationConsent rename(String name) {
        return new Oauth2AuthorizationConsent(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public Oauth2AuthorizationConsent rename(Name name) {
        return new Oauth2AuthorizationConsent(name, null);
    }

    // -------------------------------------------------------------------------
    // Row3 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row3<String, String, String> fieldsRow() {
        return (Row3) super.fieldsRow();
    }
}
