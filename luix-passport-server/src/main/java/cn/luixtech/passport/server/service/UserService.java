package cn.luixtech.passport.server.service;


import cn.luixtech.passport.server.persistence.tables.pojos.User;
import cn.luixtech.passport.server.pojo.ManagedUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.Set;

public interface UserService {
    Optional<User> findOne(String loginName);

    Set<String> findAuthorities(String userId);

    Set<String> findPermissions(String userId);

    User insert(User domain, Set<String> authorities, String rawPassword, boolean permanentAccount);

    User update(User domain, Set<String> authorities);

    void activate(String activationCode);

    void changePassword(String id, String oldRawPassword, String newRawPassword);

    User requestPasswordRecovery(String email);

    void resetPassword(String resetCode, String newRawPassword);

    Page<User> find(Pageable pageable, String username, String email, String mobileNo, Boolean enabled, Boolean activated);

    ManagedUser findById(String id);

    void deleteById(String id);

    String generateRandomCode();
}
