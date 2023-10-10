package com.luixtech.sso.starter.utils;

import com.luixtech.sso.starter.auth.AuthUser;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ByteSource;

public abstract class AuthUtils {

    public static final String ALGORITHM_NAME     = "MD5";
    public static final int    HASH_ITERATIONS    = 5;

    public static String getCurrentUsername() {
        Subject subject = SecurityUtils.getSubject();
        if (subject == null || subject.getPrincipal() == null) {
            return StringUtils.EMPTY;
        }
        return ((AuthUser) subject.getPrincipal()).getUsername();
    }

    public static AuthUser getCurrentUser() {
        Subject subject = SecurityUtils.getSubject();
        if (subject == null || subject.getPrincipal() == null) {
            return null;
        }
        return ((AuthUser) subject.getPrincipal());
    }

    public static boolean isAuthenticated() {
        Subject subject = SecurityUtils.getSubject();
        if (subject == null) {
            return false;
        }
        return subject.isAuthenticated();
    }

    public static boolean isRemembered() {
        Subject subject = SecurityUtils.getSubject();
        if (subject == null) {
            return false;
        }
        return subject.isRemembered();
    }

    public static boolean hasRole(String role) {
        Subject subject = SecurityUtils.getSubject();
        return subject.hasRole(role);
    }

    public static boolean hasPermission(String permission) {
        Subject subject = SecurityUtils.getSubject();
        return subject.isPermitted(permission);
    }

    public static boolean logout() {
        Subject subject = SecurityUtils.getSubject();
        if (subject == null) {
            return false;
        }
        subject.logout();
        return true;
    }

    public static String getSessionId() {
        Subject subject = SecurityUtils.getSubject();
        if (subject == null || subject.getSession() == null) {
            return StringUtils.EMPTY;
        }
        return (String) subject.getSession().getId();
    }

    /**
     * Encrypt password, refer to ${@link com.luixtech.sso.starter.auth.ShiroServerRealm}
     *
     * @param rawPassword     raw password
     * @param credentialsSalt credentials salt
     * @return encrypted password
     */
    public static String encryptPassword(String rawPassword, String credentialsSalt) {
        String encryptedPassword = new SimpleHash(
                ALGORITHM_NAME,
                rawPassword,
                ByteSource.Util.bytes(StringUtils.lowerCase(credentialsSalt)),
                HASH_ITERATIONS).toHex();
        return encryptedPassword;
    }

    public static void main(String[] args) {
        System.out.println(encryptPassword("password", "admin"));
    }
}
