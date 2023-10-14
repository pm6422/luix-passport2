package cn.luixtech.passport.server.service.impl;

import cn.luixtech.passport.server.persistence.Tables;
import cn.luixtech.passport.server.persistence.tables.pojos.User;
import cn.luixtech.passport.server.service.UserService;
import lombok.AllArgsConstructor;
import org.jooq.DSLContext;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final DSLContext dslContext;

    @Override
    public Optional<User> findOne(String loginName) {
        User user = dslContext.selectFrom(Tables.USER)
                .where(Tables.USER.USERNAME.eq(loginName))
                .or((Tables.USER.EMAIL).eq(loginName))
                .limit(1)
                // Convert User Record to POJO User
                .fetchOneInto(User.class);
        return Optional.ofNullable(user);
    }

    @Override
    public Set<String> findAuthorities(String userId) {
        Set<String> roles = dslContext.select(Tables.USER_AUTHORITY.AUTHORITY)
                .from(Tables.USER_AUTHORITY)
                .where(Tables.USER_AUTHORITY.USER_ID.eq(userId))
                .fetchSet(Tables.USER_AUTHORITY.AUTHORITY);
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
