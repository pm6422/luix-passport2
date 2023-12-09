package cn.luixtech.passport.server.service;

import cn.luixtech.passport.server.persistence.tables.pojos.UserAuthority;

import java.util.List;
import java.util.Set;

public interface UserAuthorityService {
    List<UserAuthority> generate(String userId, Set<String> authorities);

    void deleteByUserId(String userId);
}
