/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence;


import cn.luixtech.passport.server.persistence.tables.DataDict;
import cn.luixtech.passport.server.persistence.tables.Oauth2Authorization;
import cn.luixtech.passport.server.persistence.tables.Oauth2AuthorizationConsent;
import cn.luixtech.passport.server.persistence.tables.Oauth2RegisteredClient;
import cn.luixtech.passport.server.persistence.tables.Org;
import cn.luixtech.passport.server.persistence.tables.OrgUser;
import cn.luixtech.passport.server.persistence.tables.SpringSession;
import cn.luixtech.passport.server.persistence.tables.SpringSessionAttributes;
import cn.luixtech.passport.server.persistence.tables.TableSeqNumber;
import cn.luixtech.passport.server.persistence.tables.User;
import cn.luixtech.passport.server.persistence.tables.UserAuthEvent;
import cn.luixtech.passport.server.persistence.tables.UserLogin;
import cn.luixtech.passport.server.persistence.tables.UserPermission;
import cn.luixtech.passport.server.persistence.tables.UserPhoto;
import cn.luixtech.passport.server.persistence.tables.UserRole;
import cn.luixtech.passport.server.persistence.tables.records.DataDictRecord;
import cn.luixtech.passport.server.persistence.tables.records.Oauth2AuthorizationConsentRecord;
import cn.luixtech.passport.server.persistence.tables.records.Oauth2AuthorizationRecord;
import cn.luixtech.passport.server.persistence.tables.records.Oauth2RegisteredClientRecord;
import cn.luixtech.passport.server.persistence.tables.records.OrgRecord;
import cn.luixtech.passport.server.persistence.tables.records.OrgUserRecord;
import cn.luixtech.passport.server.persistence.tables.records.SpringSessionAttributesRecord;
import cn.luixtech.passport.server.persistence.tables.records.SpringSessionRecord;
import cn.luixtech.passport.server.persistence.tables.records.TableSeqNumberRecord;
import cn.luixtech.passport.server.persistence.tables.records.UserAuthEventRecord;
import cn.luixtech.passport.server.persistence.tables.records.UserLoginRecord;
import cn.luixtech.passport.server.persistence.tables.records.UserPermissionRecord;
import cn.luixtech.passport.server.persistence.tables.records.UserPhotoRecord;
import cn.luixtech.passport.server.persistence.tables.records.UserRecord;
import cn.luixtech.passport.server.persistence.tables.records.UserRoleRecord;

import org.jooq.ForeignKey;
import org.jooq.TableField;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.Internal;


/**
 * A class modelling foreign key relationships and constraints of tables in
 * luix-passport.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class Keys {

    // -------------------------------------------------------------------------
    // UNIQUE and PRIMARY KEY definitions
    // -------------------------------------------------------------------------

    public static final UniqueKey<DataDictRecord> KEY_DATA_DICT_PRIMARY = Internal.createUniqueKey(DataDict.DATA_DICT, DSL.name("KEY_data_dict_PRIMARY"), new TableField[] { DataDict.DATA_DICT.ID }, true);
    public static final UniqueKey<Oauth2AuthorizationRecord> KEY_OAUTH2_AUTHORIZATION_PRIMARY = Internal.createUniqueKey(Oauth2Authorization.OAUTH2_AUTHORIZATION, DSL.name("KEY_oauth2_authorization_PRIMARY"), new TableField[] { Oauth2Authorization.OAUTH2_AUTHORIZATION.ID }, true);
    public static final UniqueKey<Oauth2AuthorizationConsentRecord> KEY_OAUTH2_AUTHORIZATION_CONSENT_PRIMARY = Internal.createUniqueKey(Oauth2AuthorizationConsent.OAUTH2_AUTHORIZATION_CONSENT, DSL.name("KEY_oauth2_authorization_consent_PRIMARY"), new TableField[] { Oauth2AuthorizationConsent.OAUTH2_AUTHORIZATION_CONSENT.REGISTERED_CLIENT_ID, Oauth2AuthorizationConsent.OAUTH2_AUTHORIZATION_CONSENT.PRINCIPAL_NAME }, true);
    public static final UniqueKey<Oauth2RegisteredClientRecord> KEY_OAUTH2_REGISTERED_CLIENT_PRIMARY = Internal.createUniqueKey(Oauth2RegisteredClient.OAUTH2_REGISTERED_CLIENT, DSL.name("KEY_oauth2_registered_client_PRIMARY"), new TableField[] { Oauth2RegisteredClient.OAUTH2_REGISTERED_CLIENT.ID }, true);
    public static final UniqueKey<OrgRecord> KEY_ORG_PRIMARY = Internal.createUniqueKey(Org.ORG, DSL.name("KEY_org_PRIMARY"), new TableField[] { Org.ORG.ID }, true);
    public static final UniqueKey<OrgUserRecord> KEY_ORG_USER_PRIMARY = Internal.createUniqueKey(OrgUser.ORG_USER, DSL.name("KEY_org_user_PRIMARY"), new TableField[] { OrgUser.ORG_USER.ID }, true);
    public static final UniqueKey<SpringSessionRecord> KEY_SPRING_SESSION_PRIMARY = Internal.createUniqueKey(SpringSession.SPRING_SESSION, DSL.name("KEY_spring_session_PRIMARY"), new TableField[] { SpringSession.SPRING_SESSION.PRIMARY_ID }, true);
    public static final UniqueKey<SpringSessionRecord> KEY_SPRING_SESSION_SESSION_ID = Internal.createUniqueKey(SpringSession.SPRING_SESSION, DSL.name("KEY_spring_session_SESSION_ID"), new TableField[] { SpringSession.SPRING_SESSION.SESSION_ID }, true);
    public static final UniqueKey<SpringSessionAttributesRecord> KEY_SPRING_SESSION_ATTRIBUTES_PRIMARY = Internal.createUniqueKey(SpringSessionAttributes.SPRING_SESSION_ATTRIBUTES, DSL.name("KEY_spring_session_attributes_PRIMARY"), new TableField[] { SpringSessionAttributes.SPRING_SESSION_ATTRIBUTES.SESSION_PRIMARY_ID, SpringSessionAttributes.SPRING_SESSION_ATTRIBUTES.ATTRIBUTE_NAME }, true);
    public static final UniqueKey<TableSeqNumberRecord> KEY_TABLE_SEQ_NUMBER_PRIMARY = Internal.createUniqueKey(TableSeqNumber.TABLE_SEQ_NUMBER, DSL.name("KEY_table_seq_number_PRIMARY"), new TableField[] { TableSeqNumber.TABLE_SEQ_NUMBER.ID }, true);
    public static final UniqueKey<UserRecord> KEY_USER_EMAIL = Internal.createUniqueKey(User.USER, DSL.name("KEY_user_email"), new TableField[] { User.USER.EMAIL }, true);
    public static final UniqueKey<UserRecord> KEY_USER_MOBILE_NO = Internal.createUniqueKey(User.USER, DSL.name("KEY_user_mobile_no"), new TableField[] { User.USER.MOBILE_NO }, true);
    public static final UniqueKey<UserRecord> KEY_USER_PRIMARY = Internal.createUniqueKey(User.USER, DSL.name("KEY_user_PRIMARY"), new TableField[] { User.USER.ID }, true);
    public static final UniqueKey<UserRecord> KEY_USER_USERNAME = Internal.createUniqueKey(User.USER, DSL.name("KEY_user_username"), new TableField[] { User.USER.USERNAME }, true);
    public static final UniqueKey<UserAuthEventRecord> KEY_USER_AUTH_EVENT_PRIMARY = Internal.createUniqueKey(UserAuthEvent.USER_AUTH_EVENT, DSL.name("KEY_user_auth_event_PRIMARY"), new TableField[] { UserAuthEvent.USER_AUTH_EVENT.ID }, true);
    public static final UniqueKey<UserLoginRecord> KEY_USER_LOGIN_PRIMARY = Internal.createUniqueKey(UserLogin.USER_LOGIN, DSL.name("KEY_user_login_PRIMARY"), new TableField[] { UserLogin.USER_LOGIN.ID }, true);
    public static final UniqueKey<UserPermissionRecord> KEY_USER_PERMISSION_PRIMARY = Internal.createUniqueKey(UserPermission.USER_PERMISSION, DSL.name("KEY_user_permission_PRIMARY"), new TableField[] { UserPermission.USER_PERMISSION.ID }, true);
    public static final UniqueKey<UserPhotoRecord> KEY_USER_PHOTO_PRIMARY = Internal.createUniqueKey(UserPhoto.USER_PHOTO, DSL.name("KEY_user_photo_PRIMARY"), new TableField[] { UserPhoto.USER_PHOTO.ID }, true);
    public static final UniqueKey<UserRoleRecord> KEY_USER_ROLE_PRIMARY = Internal.createUniqueKey(UserRole.USER_ROLE, DSL.name("KEY_user_role_PRIMARY"), new TableField[] { UserRole.USER_ROLE.ID }, true);

    // -------------------------------------------------------------------------
    // FOREIGN KEY definitions
    // -------------------------------------------------------------------------

    public static final ForeignKey<OrgUserRecord, UserRecord> FK_ORG_USER_USER_ID = Internal.createForeignKey(OrgUser.ORG_USER, DSL.name("fk_org_user_user_id"), new TableField[] { OrgUser.ORG_USER.USER_ID }, Keys.KEY_USER_PRIMARY, new TableField[] { User.USER.ID }, true);
    public static final ForeignKey<UserLoginRecord, UserRecord> FK_USER_LOGIN_USER_ID = Internal.createForeignKey(UserLogin.USER_LOGIN, DSL.name("fk_user_login_user_id"), new TableField[] { UserLogin.USER_LOGIN.USER_ID }, Keys.KEY_USER_PRIMARY, new TableField[] { User.USER.ID }, true);
    public static final ForeignKey<UserPermissionRecord, UserRecord> FK_USER_PERMISSION_USER_ID = Internal.createForeignKey(UserPermission.USER_PERMISSION, DSL.name("fk_user_permission_user_id"), new TableField[] { UserPermission.USER_PERMISSION.USER_ID }, Keys.KEY_USER_PRIMARY, new TableField[] { User.USER.ID }, true);
    public static final ForeignKey<UserPhotoRecord, UserRecord> FK_USER_PHOTO_USER_ID = Internal.createForeignKey(UserPhoto.USER_PHOTO, DSL.name("fk_user_photo_user_id"), new TableField[] { UserPhoto.USER_PHOTO.ID }, Keys.KEY_USER_PRIMARY, new TableField[] { User.USER.ID }, true);
    public static final ForeignKey<UserRoleRecord, UserRecord> FK_USER_ROLE_USER_ID = Internal.createForeignKey(UserRole.USER_ROLE, DSL.name("fk_user_role_user_id"), new TableField[] { UserRole.USER_ROLE.USER_ID }, Keys.KEY_USER_PRIMARY, new TableField[] { User.USER.ID }, true);
}
