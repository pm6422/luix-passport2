/*
 * This file is generated by jOOQ.
 */
package cn.luixtech.passport.server.persistence;


import cn.luixtech.passport.server.persistence.tables.DataDict;
import cn.luixtech.passport.server.persistence.tables.Oauth2Authorization;
import cn.luixtech.passport.server.persistence.tables.Oauth2AuthorizationConsent;
import cn.luixtech.passport.server.persistence.tables.Oauth2RegisteredClient;
import cn.luixtech.passport.server.persistence.tables.SpringSession;
import cn.luixtech.passport.server.persistence.tables.SpringSessionAttributes;
import cn.luixtech.passport.server.persistence.tables.TableSeqNumber;
import cn.luixtech.passport.server.persistence.tables.Team;
import cn.luixtech.passport.server.persistence.tables.TeamUser;
import cn.luixtech.passport.server.persistence.tables.User;
import cn.luixtech.passport.server.persistence.tables.UserAuthEvent;
import cn.luixtech.passport.server.persistence.tables.UserLogin;
import cn.luixtech.passport.server.persistence.tables.UserPermission;
import cn.luixtech.passport.server.persistence.tables.UserPhoto;
import cn.luixtech.passport.server.persistence.tables.UserRole;


/**
 * Convenience access to all tables in luix-passport.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class Tables {

    /**
     * The table <code>luix-passport.data_dict</code>.
     */
    public static final DataDict DATA_DICT = DataDict.DATA_DICT;

    /**
     * The table <code>luix-passport.oauth2_authorization</code>.
     */
    public static final Oauth2Authorization OAUTH2_AUTHORIZATION = Oauth2Authorization.OAUTH2_AUTHORIZATION;

    /**
     * The table <code>luix-passport.oauth2_authorization_consent</code>.
     */
    public static final Oauth2AuthorizationConsent OAUTH2_AUTHORIZATION_CONSENT = Oauth2AuthorizationConsent.OAUTH2_AUTHORIZATION_CONSENT;

    /**
     * The table <code>luix-passport.oauth2_registered_client</code>.
     */
    public static final Oauth2RegisteredClient OAUTH2_REGISTERED_CLIENT = Oauth2RegisteredClient.OAUTH2_REGISTERED_CLIENT;

    /**
     * The table <code>luix-passport.spring_session</code>.
     */
    public static final SpringSession SPRING_SESSION = SpringSession.SPRING_SESSION;

    /**
     * The table <code>luix-passport.spring_session_attributes</code>.
     */
    public static final SpringSessionAttributes SPRING_SESSION_ATTRIBUTES = SpringSessionAttributes.SPRING_SESSION_ATTRIBUTES;

    /**
     * The table <code>luix-passport.table_seq_number</code>.
     */
    public static final TableSeqNumber TABLE_SEQ_NUMBER = TableSeqNumber.TABLE_SEQ_NUMBER;

    /**
     * The table <code>luix-passport.team</code>.
     */
    public static final Team TEAM = Team.TEAM;

    /**
     * The table <code>luix-passport.team_user</code>.
     */
    public static final TeamUser TEAM_USER = TeamUser.TEAM_USER;

    /**
     * The table <code>luix-passport.user</code>.
     */
    public static final User USER = User.USER;

    /**
     * The table <code>luix-passport.user_auth_event</code>.
     */
    public static final UserAuthEvent USER_AUTH_EVENT = UserAuthEvent.USER_AUTH_EVENT;

    /**
     * The table <code>luix-passport.user_login</code>.
     */
    public static final UserLogin USER_LOGIN = UserLogin.USER_LOGIN;

    /**
     * The table <code>luix-passport.user_permission</code>.
     */
    public static final UserPermission USER_PERMISSION = UserPermission.USER_PERMISSION;

    /**
     * The table <code>luix-passport.user_photo</code>.
     */
    public static final UserPhoto USER_PHOTO = UserPhoto.USER_PHOTO;

    /**
     * The table <code>luix-passport.user_role</code>.
     */
    public static final UserRole USER_ROLE = UserRole.USER_ROLE;
}
