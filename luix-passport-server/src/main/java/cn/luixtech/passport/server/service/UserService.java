package cn.luixtech.passport.server.service;


import cn.luixtech.passport.server.persistence.tables.pojos.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserService {
    Optional<User> findOne(String loginName);

    Set<String> findAuthorities(String userId);

    Set<String> findPermissions(String userId);

    User insert(User domain, List<String> authorities, String rawPassword);

    User update(User domain, List<String> authorities);

    void activate(String activationCode);
}
