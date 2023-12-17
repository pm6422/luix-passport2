/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables.records;


import cn.luixtech.passport.server.persistence.tables.UserPreference;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record4;
import org.jooq.Row4;
import org.jooq.impl.UpdatableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class UserPreferenceRecord extends UpdatableRecordImpl<UserPreferenceRecord> implements Record4<String, String, String, String> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>luix-passport.user_preference.user_id</code>.
     */
    public void setUserId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>luix-passport.user_preference.user_id</code>.
     */
    public String getUserId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>luix-passport.user_preference.locale</code>.
     */
    public void setLocale(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>luix-passport.user_preference.locale</code>.
     */
    public String getLocale() {
        return (String) get(1);
    }

    /**
     * Setter for <code>luix-passport.user_preference.time_zone</code>.
     */
    public void setTimeZone(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>luix-passport.user_preference.time_zone</code>.
     */
    public String getTimeZone() {
        return (String) get(2);
    }

    /**
     * Setter for <code>luix-passport.user_preference.date_format</code>.
     */
    public void setDateFormat(String value) {
        set(3, value);
    }

    /**
     * Getter for <code>luix-passport.user_preference.date_format</code>.
     */
    public String getDateFormat() {
        return (String) get(3);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record1<String> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record4 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row4<String, String, String, String> fieldsRow() {
        return (Row4) super.fieldsRow();
    }

    @Override
    public Row4<String, String, String, String> valuesRow() {
        return (Row4) super.valuesRow();
    }

    @Override
    public Field<String> field1() {
        return UserPreference.USER_PREFERENCE.USER_ID;
    }

    @Override
    public Field<String> field2() {
        return UserPreference.USER_PREFERENCE.LOCALE;
    }

    @Override
    public Field<String> field3() {
        return UserPreference.USER_PREFERENCE.TIME_ZONE;
    }

    @Override
    public Field<String> field4() {
        return UserPreference.USER_PREFERENCE.DATE_FORMAT;
    }

    @Override
    public String component1() {
        return getUserId();
    }

    @Override
    public String component2() {
        return getLocale();
    }

    @Override
    public String component3() {
        return getTimeZone();
    }

    @Override
    public String component4() {
        return getDateFormat();
    }

    @Override
    public String value1() {
        return getUserId();
    }

    @Override
    public String value2() {
        return getLocale();
    }

    @Override
    public String value3() {
        return getTimeZone();
    }

    @Override
    public String value4() {
        return getDateFormat();
    }

    @Override
    public UserPreferenceRecord value1(String value) {
        setUserId(value);
        return this;
    }

    @Override
    public UserPreferenceRecord value2(String value) {
        setLocale(value);
        return this;
    }

    @Override
    public UserPreferenceRecord value3(String value) {
        setTimeZone(value);
        return this;
    }

    @Override
    public UserPreferenceRecord value4(String value) {
        setDateFormat(value);
        return this;
    }

    @Override
    public UserPreferenceRecord values(String value1, String value2, String value3, String value4) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached UserPreferenceRecord
     */
    public UserPreferenceRecord() {
        super(UserPreference.USER_PREFERENCE);
    }

    /**
     * Create a detached, initialised UserPreferenceRecord
     */
    public UserPreferenceRecord(String userId, String locale, String timeZone, String dateFormat) {
        super(UserPreference.USER_PREFERENCE);

        setUserId(userId);
        setLocale(locale);
        setTimeZone(timeZone);
        setDateFormat(dateFormat);
        resetChangedOnNotNull();
    }

    /**
     * Create a detached, initialised UserPreferenceRecord
     */
    public UserPreferenceRecord(cn.luixtech.passport.server.persistence.tables.pojos.UserPreference value) {
        super(UserPreference.USER_PREFERENCE);

        if (value != null) {
            setUserId(value.getUserId());
            setLocale(value.getLocale());
            setTimeZone(value.getTimeZone());
            setDateFormat(value.getDateFormat());
            resetChangedOnNotNull();
        }
    }
}
