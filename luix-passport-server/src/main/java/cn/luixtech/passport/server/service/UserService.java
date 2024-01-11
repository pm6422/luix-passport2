package cn.luixtech.passport.server.service;


import cn.luixtech.passport.server.persistence.tables.pojos.User;
import cn.luixtech.passport.server.pojo.ManagedUser;
import cn.luixtech.passport.server.pojo.ProfileScopeUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.temporal.TemporalUnit;
import java.util.Optional;
import java.util.Set;

public interface UserService {
    Optional<User> findOne(String loginName);

    ManagedUser findById(String id);

    ProfileScopeUser findByUsername(String username);

    Set<String> findRoles(String userId);

    Set<String> findTeamIds(String userId);

    Set<String> findPermissions(String userId);

    User insert(User domain, Set<String> authorities, String rawPassword, boolean permanentAccount);

    User update(User domain, Set<String> authorities);

    void activate(String activationCode);

    User changePassword(String id, String oldRawPassword, String newRawPassword);

    User requestPasswordRecovery(String email);

    void resetPassword(String resetCode, String newRawPassword);

    Page<User> find(Pageable pageable, String username, String email, String mobileNo, Boolean enabled, Boolean activated);

    void deleteById(String id);

    String generateRandomCode();

    User extendAccount(String id, long amountToAdd, TemporalUnit unit);
}
