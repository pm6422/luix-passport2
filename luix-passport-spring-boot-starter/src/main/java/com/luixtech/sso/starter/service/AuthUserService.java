package com.luixtech.sso.starter.service;

import com.luixtech.sso.starter.auth.AuthUser;

import java.util.Optional;
import java.util.Set;

public interface AuthUserService {
    Optional<AuthUser> findOne(String loginName);

    Set<String> findRoles(String userId);

    Set<String> findPermissions(String userId);
}
