package cn.luixtech.passport.server.service.impl;

import cn.luixtech.passport.server.persistence.tables.pojos.UserAuthority;
import cn.luixtech.passport.server.service.UserAuthorityService;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static cn.luixtech.passport.server.service.AuthorityService.AUTH_ANONYMOUS;
import static cn.luixtech.passport.server.service.AuthorityService.AUTH_USER;

@Service
public class UserAuthorityServiceImpl implements UserAuthorityService {
    @Override
    public List<UserAuthority> generate(String userId, List<String> newAuthorities) {
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
}
