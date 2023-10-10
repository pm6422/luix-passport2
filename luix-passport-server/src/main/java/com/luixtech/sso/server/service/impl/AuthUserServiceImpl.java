package com.luixtech.sso.server.service.impl;

import com.luixtech.sso.server.persistence.Tables;
import com.luixtech.sso.starter.auth.AuthUser;
import com.luixtech.sso.starter.service.AuthUserService;
import lombok.AllArgsConstructor;
import org.jooq.DSLContext;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthUserServiceImpl implements AuthUserService {
    private final DSLContext dslContext;

    @Override
    public Optional<AuthUser> findOne(String loginName) {
        AuthUser user = dslContext.selectFrom(Tables.USER)
                .where(Tables.USER.USERNAME.eq(loginName))
                .or((Tables.USER.EMAIL).eq(loginName))
                .limit(1)
                // Convert User Record to POJO User
                .fetchOneInto(AuthUser.class);
        return Optional.ofNullable(user);
    }

    @Override
    public Set<String> findRoles(String userId) {
        Set<String> roles = dslContext.select(Tables.USER_ROLE.ROLE)
                .from(Tables.USER_ROLE)
                .where(Tables.USER_ROLE.USER_ID.eq(userId))
                .fetchSet(Tables.USER_ROLE.ROLE);
        return roles;
    }

    @Override
    public Set<String> findPermissions(String userId) {
        Set<String> permissions = dslContext.select(Tables.USER_PERMISSION.PERMISSION)
                .from(Tables.USER_PERMISSION)
                .where(Tables.USER_PERMISSION.USER_ID.eq(userId))
                .fetchSet(Tables.USER_PERMISSION.PERMISSION);
        return permissions;
    }
}
