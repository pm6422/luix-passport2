package cn.luixtech.passport.server.service;


import cn.luixtech.passport.server.config.domain.AuthUser;
import cn.luixtech.passport.server.persistence.tables.pojos.User;

import java.util.Optional;
import java.util.Set;

public interface AuthUserService {
    Optional<User> findOne(String loginName);

    Set<String> findRoles(String userId);

    Set<String> findPermissions(String userId);
}
