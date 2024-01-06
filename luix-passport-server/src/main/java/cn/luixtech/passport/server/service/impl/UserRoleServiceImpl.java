package cn.luixtech.passport.server.service.impl;

import cn.luixtech.passport.server.persistence.Tables;
import cn.luixtech.passport.server.persistence.tables.pojos.UserRole;
import cn.luixtech.passport.server.service.UserRoleService;
import lombok.AllArgsConstructor;
import org.jooq.DSLContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static cn.luixtech.passport.server.service.AuthorityService.AUTH_ANONYMOUS;
import static cn.luixtech.passport.server.service.AuthorityService.AUTH_USER;

@Service
@AllArgsConstructor
public class UserRoleServiceImpl implements UserRoleService {

    private final DSLContext dslContext;

    @Override
    public List<UserRole> generate(String userId, Set<String> newAuthorities) {
        List<UserRole> userAuthorities = newAuthorities.stream()
                .map(auth -> build(userId, auth))
                .collect(Collectors.toList());

        // set default user newAuthorities
        UserRole anoAuth = build(userId, AUTH_ANONYMOUS);
        UserRole userAuth = build(userId, AUTH_USER);

        if (!userAuthorities.contains(anoAuth)) {
            userAuthorities.add(anoAuth);
        }
        if (!userAuthorities.contains(userAuth)) {
            userAuthorities.add(userAuth);
        }
        return userAuthorities;
    }

    private UserRole build(String userId, String authority) {
        UserRole userAuthority = new UserRole();
        userAuthority.setUserId(userId);
        userAuthority.setRole(authority);
        return userAuthority;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void deleteByUserId(String userId) {
        dslContext.delete(Tables.USER_ROLE)
                .where(Tables.USER_ROLE.USER_ID.eq(userId))
                .execute();
    }
}
