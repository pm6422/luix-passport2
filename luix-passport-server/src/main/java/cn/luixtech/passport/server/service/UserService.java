package cn.luixtech.passport.server.service;


import cn.luixtech.passport.server.persistence.tables.pojos.User;
import cn.luixtech.passport.server.pojo.ChangePassword;
import cn.luixtech.passport.server.pojo.ManagedUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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

    void changePassword(String userId, String oldRawPassword, String newRawPassword);

    User requestPasswordReset(String email);

    void resetPassword(String resetCode, String newRawPassword);

    Page<User> find(Pageable pageable, String username, String email, String mobileNo, Boolean enabled, Boolean activated);

    ManagedUser findById(String id);
}
