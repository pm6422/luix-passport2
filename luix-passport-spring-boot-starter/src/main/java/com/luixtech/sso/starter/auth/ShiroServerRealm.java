package com.luixtech.sso.starter.auth;

import com.luixtech.sso.starter.service.AuthUserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;

import java.util.Set;

@Slf4j
@AllArgsConstructor
public class ShiroServerRealm extends AuthorizingRealm {

    private final AuthUserService authUserService;

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        UsernamePasswordToken userToken = (UsernamePasswordToken) token;
        if (StringUtils.isEmpty(userToken.getUsername())) {
            throw new AccountException("Username is empty");
        }
        AuthUser authUser = authUserService.findOne(userToken.getUsername())
                .orElseThrow(() -> new UnknownAccountException("User [" + userToken.getUsername() + "] was not found"));
        String passwordHash = authUser.getPasswordHash();
        authUser.setPasswordHash("***");
        if (!Boolean.TRUE.equals(authUser.getActivated())) {
            throw new LockedAccountException("User is inactive");
        }
        if (!Boolean.TRUE.equals(authUser.getEnabled())) {
            throw new DisabledAccountException("User is disabled");
        }
        Set<String> roles = authUserService.findRoles(authUser.getId());
        Set<String> permissions = authUserService.findPermissions(authUser.getId());
        authUser.setRoles(roles);
        authUser.setPermissions(permissions);
        log.info("Found user: {}", authUser);
        return new SimpleAuthenticationInfo(authUser, passwordHash, ByteSource.Util.bytes(StringUtils.lowerCase(authUser.getUsername())), getName());
    }

    /**
     * Find user roles and permissions by username
     *
     * @param principal principal
     * @return authorization info
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principal) {
        AuthUser authUser = (AuthUser) principal.getPrimaryPrincipal();

        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        simpleAuthorizationInfo.addRoles(authUser.getRoles());
        simpleAuthorizationInfo.addStringPermissions(authUser.getPermissions());
        return simpleAuthorizationInfo;
    }
}
