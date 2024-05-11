/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence.tables.records;


import cn.luixtech.passport.server.persistence.tables.User;

import java.time.LocalDateTime;

import org.jooq.Record1;
import org.jooq.impl.UpdatableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class UserRecord extends UpdatableRecordImpl<UserRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>public.user.id</code>.
     */
    public void setId(String value) {
        set(0, value);
    }

    /**
     * Getter for <code>public.user.id</code>.
     */
    public String getId() {
        return (String) get(0);
    }

    /**
     * Setter for <code>public.user.username</code>.
     */
    public void setUsername(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>public.user.username</code>.
     */
    public String getUsername() {
        return (String) get(1);
    }

    /**
     * Setter for <code>public.user.email</code>.
     */
    public void setEmail(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>public.user.email</code>.
     */
    public String getEmail() {
        return (String) get(2);
    }

    /**
     * Setter for <code>public.user.mobile_no</code>.
     */
    public void setMobileNo(String value) {
        set(3, value);
    }

    /**
     * Getter for <code>public.user.mobile_no</code>.
     */
    public String getMobileNo() {
        return (String) get(3);
    }

    /**
     * Setter for <code>public.user.first_name</code>.
     */
    public void setFirstName(String value) {
        set(4, value);
    }

    /**
     * Getter for <code>public.user.first_name</code>.
     */
    public String getFirstName() {
        return (String) get(4);
    }

    /**
     * Setter for <code>public.user.last_name</code>.
     */
    public void setLastName(String value) {
        set(5, value);
    }

    /**
     * Getter for <code>public.user.last_name</code>.
     */
    public String getLastName() {
        return (String) get(5);
    }

    /**
     * Setter for <code>public.user.password_hash</code>.
     */
    public void setPasswordHash(String value) {
        set(6, value);
    }

    /**
     * Getter for <code>public.user.password_hash</code>.
     */
    public String getPasswordHash() {
        return (String) get(6);
    }

    /**
     * Setter for <code>public.user.activation_code</code>.
     */
    public void setActivationCode(String value) {
        set(7, value);
    }

    /**
     * Getter for <code>public.user.activation_code</code>.
     */
    public String getActivationCode() {
        return (String) get(7);
    }

    /**
     * Setter for <code>public.user.verification_code</code>.
     */
    public void setVerificationCode(String value) {
        set(8, value);
    }

    /**
     * Getter for <code>public.user.verification_code</code>.
     */
    public String getVerificationCode() {
        return (String) get(8);
    }

    /**
     * Setter for <code>public.user.verification_code_sent_at</code>.
     */
    public void setVerificationCodeSentAt(LocalDateTime value) {
        set(9, value);
    }

    /**
     * Getter for <code>public.user.verification_code_sent_at</code>.
     */
    public LocalDateTime getVerificationCodeSentAt() {
        return (LocalDateTime) get(9);
    }

    /**
     * Setter for <code>public.user.new_email</code>.
     */
    public void setNewEmail(String value) {
        set(10, value);
    }

    /**
     * Getter for <code>public.user.new_email</code>.
     */
    public String getNewEmail() {
        return (String) get(10);
    }

    /**
     * Setter for <code>public.user.reset_code</code>.
     */
    public void setResetCode(String value) {
        set(11, value);
    }

    /**
     * Getter for <code>public.user.reset_code</code>.
     */
    public String getResetCode() {
        return (String) get(11);
    }

    /**
     * Setter for <code>public.user.reset_at</code>.
     */
    public void setResetAt(LocalDateTime value) {
        set(12, value);
    }

    /**
     * Getter for <code>public.user.reset_at</code>.
     */
    public LocalDateTime getResetAt() {
        return (LocalDateTime) get(12);
    }

    /**
     * Setter for <code>public.user.remark</code>.
     */
    public void setRemark(String value) {
        set(13, value);
    }

    /**
     * Getter for <code>public.user.remark</code>.
     */
    public String getRemark() {
        return (String) get(13);
    }

    /**
     * Setter for <code>public.user.activated</code>.
     */
    public void setActivated(Boolean value) {
        set(14, value);
    }

    /**
     * Getter for <code>public.user.activated</code>.
     */
    public Boolean getActivated() {
        return (Boolean) get(14);
    }

    /**
     * Setter for <code>public.user.enabled</code>.
     */
    public void setEnabled(Boolean value) {
        set(15, value);
    }

    /**
     * Getter for <code>public.user.enabled</code>.
     */
    public Boolean getEnabled() {
        return (Boolean) get(15);
    }

    /**
     * Setter for <code>public.user.account_expires_at</code>.
     */
    public void setAccountExpiresAt(LocalDateTime value) {
        set(16, value);
    }

    /**
     * Getter for <code>public.user.account_expires_at</code>.
     */
    public LocalDateTime getAccountExpiresAt() {
        return (LocalDateTime) get(16);
    }

    /**
     * Setter for <code>public.user.password_expires_at</code>.
     */
    public void setPasswordExpiresAt(LocalDateTime value) {
        set(17, value);
    }

    /**
     * Getter for <code>public.user.password_expires_at</code>.
     */
    public LocalDateTime getPasswordExpiresAt() {
        return (LocalDateTime) get(17);
    }

    /**
     * Setter for <code>public.user.last_sign_in_at</code>.
     */
    public void setLastSignInAt(LocalDateTime value) {
        set(18, value);
    }

    /**
     * Getter for <code>public.user.last_sign_in_at</code>.
     */
    public LocalDateTime getLastSignInAt() {
        return (LocalDateTime) get(18);
    }

    /**
     * Setter for <code>public.user.language</code>.
     */
    public void setLanguage(String value) {
        set(19, value);
    }

    /**
     * Getter for <code>public.user.language</code>.
     */
    public String getLanguage() {
        return (String) get(19);
    }

    /**
     * Setter for <code>public.user.created_by</code>.
     */
    public void setCreatedBy(String value) {
        set(20, value);
    }

    /**
     * Getter for <code>public.user.created_by</code>.
     */
    public String getCreatedBy() {
        return (String) get(20);
    }

    /**
     * Setter for <code>public.user.created_at</code>.
     */
    public void setCreatedAt(LocalDateTime value) {
        set(21, value);
    }

    /**
     * Getter for <code>public.user.created_at</code>.
     */
    public LocalDateTime getCreatedAt() {
        return (LocalDateTime) get(21);
    }

    /**
     * Setter for <code>public.user.modified_by</code>.
     */
    public void setModifiedBy(String value) {
        set(22, value);
    }

    /**
     * Getter for <code>public.user.modified_by</code>.
     */
    public String getModifiedBy() {
        return (String) get(22);
    }

    /**
     * Setter for <code>public.user.modified_at</code>.
     */
    public void setModifiedAt(LocalDateTime value) {
        set(23, value);
    }

    /**
     * Getter for <code>public.user.modified_at</code>.
     */
    public LocalDateTime getModifiedAt() {
        return (LocalDateTime) get(23);
    }

    /**
     * Setter for <code>public.user.locale</code>.
     */
    public void setLocale(String value) {
        set(24, value);
    }

    /**
     * Getter for <code>public.user.locale</code>.
     */
    public String getLocale() {
        return (String) get(24);
    }

    /**
     * Setter for <code>public.user.time_zone</code>.
     */
    public void setTimeZone(String value) {
        set(25, value);
    }

    /**
     * Getter for <code>public.user.time_zone</code>.
     */
    public String getTimeZone() {
        return (String) get(25);
    }

    /**
     * Setter for <code>public.user.date_format</code>.
     */
    public void setDateFormat(String value) {
        set(26, value);
    }

    /**
     * Getter for <code>public.user.date_format</code>.
     */
    public String getDateFormat() {
        return (String) get(26);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record1<String> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached UserRecord
     */
    public UserRecord() {
        super(User.USER);
    }

    /**
     * Create a detached, initialised UserRecord
     */
    public UserRecord(String id, String username, String email, String mobileNo, String firstName, String lastName, String passwordHash, String activationCode, String verificationCode, LocalDateTime verificationCodeSentAt, String newEmail, String resetCode, LocalDateTime resetAt, String remark, Boolean activated, Boolean enabled, LocalDateTime accountExpiresAt, LocalDateTime passwordExpiresAt, LocalDateTime lastSignInAt, String language, String createdBy, LocalDateTime createdAt, String modifiedBy, LocalDateTime modifiedAt, String locale, String timeZone, String dateFormat) {
        super(User.USER);

        setId(id);
        setUsername(username);
        setEmail(email);
        setMobileNo(mobileNo);
        setFirstName(firstName);
        setLastName(lastName);
        setPasswordHash(passwordHash);
        setActivationCode(activationCode);
        setVerificationCode(verificationCode);
        setVerificationCodeSentAt(verificationCodeSentAt);
        setNewEmail(newEmail);
        setResetCode(resetCode);
        setResetAt(resetAt);
        setRemark(remark);
        setActivated(activated);
        setEnabled(enabled);
        setAccountExpiresAt(accountExpiresAt);
        setPasswordExpiresAt(passwordExpiresAt);
        setLastSignInAt(lastSignInAt);
        setLanguage(language);
        setCreatedBy(createdBy);
        setCreatedAt(createdAt);
        setModifiedBy(modifiedBy);
        setModifiedAt(modifiedAt);
        setLocale(locale);
        setTimeZone(timeZone);
        setDateFormat(dateFormat);
        resetChangedOnNotNull();
    }
}
