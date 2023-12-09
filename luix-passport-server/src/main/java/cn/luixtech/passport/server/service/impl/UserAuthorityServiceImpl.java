package cn.luixtech.passport.server.service.impl;

import cn.luixtech.passport.server.persistence.Tables;
import cn.luixtech.passport.server.persistence.tables.pojos.UserAuthority;
import cn.luixtech.passport.server.service.UserAuthorityService;
import lombok.AllArgsConstructor;
import org.jooq.DSLContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static cn.luixtech.passport.server.persistence.Tables.USER_AUTHORITY;
import static cn.luixtech.passport.server.service.AuthorityService.AUTH_ANONYMOUS;
import static cn.luixtech.passport.server.service.AuthorityService.AUTH_USER;

@Service
@AllArgsConstructor
public class UserAuthorityServiceImpl implements UserAuthorityService {

    private final DSLContext dslContext;

    @Override
    public List<UserAuthority> generate(String userId, Set<String> newAuthorities) {
        List<UserAuthority> userAuthorities = newAuthorities.stream()
                .map(auth -> build(userId, auth))
                .collect(Collectors.toList());

        // set default user newAuthorities
        UserAuthority anoAuth = build(userId, AUTH_ANONYMOUS);
        UserAuthority userAuth = build(userId, AUTH_USER);

        if (!userAuthorities.contains(anoAuth)) {
            userAuthorities.add(anoAuth);
        }
        if (!userAuthorities.contains(userAuth)) {
            userAuthorities.add(userAuth);
        }
        return userAuthorities;
    }

    private UserAuthority build(String userId, String authority) {
        UserAuthority userAuthority = new UserAuthority();
        userAuthority.setUserId(userId);
        userAuthority.setAuthority(authority);
        return userAuthority;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void deleteByUserId(String userId) {
        dslContext.delete(Tables.USER_AUTHORITY)
                .where(USER_AUTHORITY.USER_ID.eq(userId))
                .execute();
    }
}
