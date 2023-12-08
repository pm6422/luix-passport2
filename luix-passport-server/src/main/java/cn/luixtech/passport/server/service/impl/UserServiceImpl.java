package cn.luixtech.passport.server.service.impl;

import cn.luixtech.passport.server.config.oauth.AuthUser;
import cn.luixtech.passport.server.exception.UserNotActivatedException;
import cn.luixtech.passport.server.persistence.Tables;
import cn.luixtech.passport.server.persistence.tables.daos.UserAuthorityDao;
import cn.luixtech.passport.server.persistence.tables.daos.UserDao;
import cn.luixtech.passport.server.persistence.tables.pojos.User;
import cn.luixtech.passport.server.persistence.tables.pojos.UserAuthority;
import cn.luixtech.passport.server.persistence.tables.records.UserRecord;
import cn.luixtech.passport.server.service.UserAuthorityService;
import cn.luixtech.passport.server.service.UserService;
import com.google.common.collect.ImmutableMap;
import com.luixtech.uidgenerator.core.id.IdGenerator;
import com.luixtech.utilities.exception.DataNotFoundException;
import com.luixtech.utilities.exception.DuplicationException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static cn.luixtech.passport.server.config.AuthorizationServerConfiguration.DEFAULT_PASSWORD_ENCODER;
import static cn.luixtech.passport.server.persistence.Tables.USER;
import static cn.luixtech.passport.server.persistence.Tables.USER_AUTHORITY;

/**
 * Authenticate a user from the database.
 * <p>
 * Refer below to review match password
 * {@link DaoAuthenticationProvider#additionalAuthenticationChecks}
 */
@Slf4j
@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
    private static final BCryptPasswordEncoder BCRYPT_PASSWORD_ENCODER = new BCryptPasswordEncoder();
    private final        DSLContext            dslContext;
    private final        UserDao               userDao;
    private final        UserAuthorityDao      userAuthorityDao;
    private final        UserAuthorityService  userAuthorityService;

    @Override
//    @Transactional(propagation = Propagation.REQUIRED, readOnly = true, noRollbackFor = Exception.class)
    public UserDetails loadUserByUsername(final String loginName) {
        log.debug("Authenticating {}", loginName);
        if (StringUtils.isEmpty(loginName)) {
            log.warn("Login name must not be empty!");
            throw new BadCredentialsException("Login name must not be empty");
        }
        User user = findOne(loginName)
                .orElseThrow(() -> new UsernameNotFoundException("User " + loginName + " was not found"));
        if (!Boolean.TRUE.equals(user.getActivated())) {
            throw new UserNotActivatedException(loginName);
        }
        List<GrantedAuthority> authorities = findAuthorities(user.getId())
                .stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        return new AuthUser(user.getId(), user.getUsername(),
                user.getFirstName(), user.getLastName(),
                user.getPasswordHash(), user.getEnabled(),
                true, true,
                true, authorities);
    }

    @Override
    public Optional<User> findOne(String loginName) {
        User user = dslContext.select(Tables.USER)
                .where(USER.USERNAME.eq(loginName))
                .or(USER.EMAIL.eq(loginName))
                .or(USER.MOBILE_NO.eq(loginName))
                .limit(1)
                // Convert User Record to POJO User
                .fetchOneInto(User.class);
        return Optional.ofNullable(user);
    }

    @Override
    public Set<String> findAuthorities(String userId) {
        return dslContext.select(Tables.USER_AUTHORITY.AUTHORITY)
                .from(Tables.USER_AUTHORITY)
                .where(Tables.USER_AUTHORITY.USER_ID.eq(userId))
                .fetchSet(Tables.USER_AUTHORITY.AUTHORITY);
    }

    @Override
    public Set<String> findPermissions(String userId) {
        return dslContext.select(Tables.USER_PERMISSION.PERMISSION)
                .from(Tables.USER_PERMISSION)
                .where(Tables.USER_PERMISSION.USER_ID.eq(userId))
                .fetchSet(Tables.USER_PERMISSION.PERMISSION);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public User insert(User domain, List<String> authorities, String rawPassword) {
        // From pojo to record
        UserRecord userRecord = dslContext.newRecord(USER, domain);

        if (userDao.fetchOneByUsername(domain.getUsername().toLowerCase()) != null) {
            throw new DuplicationException(ImmutableMap.of("username", domain.getUsername()));
        }
        if (userDao.fetchOneByEmail(domain.getEmail()) != null) {
            throw new DuplicationException(ImmutableMap.of("email", domain.getEmail()));
        }
        if (userDao.fetchOneByMobileNo(domain.getMobileNo()) != null) {
            throw new DuplicationException(ImmutableMap.of("mobileNo", domain.getMobileNo()));
        }

        String id = IdGenerator.generateId();
        domain.setId(id);
        domain.setUsername(domain.getUsername().toLowerCase());
        domain.setEmail(domain.getEmail().toLowerCase());
        domain.setPasswordHash(DEFAULT_PASSWORD_ENCODER + BCRYPT_PASSWORD_ENCODER.encode(rawPassword));
        domain.setActivationCode(RandomStringUtils.randomNumeric(20));
        domain.setResetCode(RandomStringUtils.randomNumeric(20));
        domain.setResetTime(LocalDateTime.now());
        domain.setProfilePhotoEnabled(false);
        domain.setActivated(false);
        domain.setEnabled(true);

        userDao.insert(domain);
        log.info("Created user: {}", domain);

        List<UserAuthority> userAuthorities = userAuthorityService.generate(id, authorities);
        userAuthorityDao.insert(userAuthorities);
        log.info("Created user authorities: {}", userAuthorities);

        return domain;
    }

    @Override
    public User update(User domain, List<String> authorities) {
        User existingOne = userDao.findById(domain.getId());
        if (existingOne == null) {
            throw new DataNotFoundException(domain.getId());
        }
        int existingEmailCount = dslContext.fetchCount(DSL.select(Tables.USER)
                .where(USER.EMAIL.eq(domain.getEmail()))
                .and(USER.ID.ne(domain.getId())));
        if (existingEmailCount > 0) {
            throw new DuplicationException(ImmutableMap.of("email", domain.getEmail()));
        }
        int existingMobileNoCount = dslContext.fetchCount(DSL.select(Tables.USER)
                .where(USER.MOBILE_NO.eq(domain.getEmail()))
                .and(USER.ID.ne(domain.getId())));
        if (existingMobileNoCount > 0) {
            throw new DuplicationException(ImmutableMap.of("mobileNo", domain.getMobileNo()));
        }

        existingOne.setFirstName(domain.getFirstName());
        existingOne.setLastName(domain.getLastName());
        existingOne.setEmail(domain.getEmail().toLowerCase());
        existingOne.setMobileNo(domain.getMobileNo());
        existingOne.setEnabled(domain.getEnabled());
        existingOne.setRemarks(domain.getRemarks());

        userDao.update(existingOne);
        log.debug("Updated user: {}", domain);

        // first delete user authorities
        dslContext.delete(Tables.USER_AUTHORITY)
                .where(USER_AUTHORITY.USER_ID.eq(domain.getId()))
                .execute();

        // then insert user authorities
        List<UserAuthority> userAuthorities = userAuthorityService.generate(domain.getId(), authorities);
        userAuthorityDao.insert(userAuthorities);
        log.info("Updated user authorities: {}", userAuthorities);

        return existingOne;
    }

    @Override
    public void activate(String activationCode) {
        List<User> users = userDao.fetchByActivationCode(activationCode);
        if (CollectionUtils.isEmpty(users)) {
            throw new DataNotFoundException(activationCode);
        }

        users.get(0).setActivated(true);
        users.get(0).setActivationCode(null);
        userDao.update(users.get(0));
        log.info("Activated user: {}", users.get(0));
    }
}
