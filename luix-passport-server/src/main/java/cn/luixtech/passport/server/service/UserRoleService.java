package cn.luixtech.passport.server.service;

import cn.luixtech.passport.server.persistence.tables.pojos.UserRole;

import java.util.List;
import java.util.Set;

public interface UserRoleService {
    List<UserRole> generate(String userId, Set<String> authorities);

    void deleteByUserId(String userId);
}
