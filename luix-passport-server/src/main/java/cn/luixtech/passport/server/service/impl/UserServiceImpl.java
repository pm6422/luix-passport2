package cn.luixtech.passport.server.service.impl;

import cn.luixtech.passport.server.config.oauth.AuthUser;
import cn.luixtech.passport.server.exception.UserNotActivatedException;
import cn.luixtech.passport.server.persistence.Tables;
import cn.luixtech.passport.server.persistence.tables.daos.UserAuthorityDao;
import cn.luixtech.passport.server.persistence.tables.daos.UserDao;
import cn.luixtech.passport.server.persistence.tables.pojos.User;
import cn.luixtech.passport.server.persistence.tables.pojos.UserAuthority;
import cn.luixtech.passport.server.persistence.tables.records.UserRecord;
import cn.luixtech.passport.server.pojo.ManagedUser;
import cn.luixtech.passport.server.service.UserAuthorityService;
import cn.luixtech.passport.server.service.UserService;
import com.google.common.collect.ImmutableMap;
import com.luixtech.springbootframework.component.MessageCreator;
import com.luixtech.uidgenerator.core.id.IdGenerator;
import com.luixtech.utilities.exception.DataNotFoundException;
import com.luixtech.utilities.exception.DuplicationException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.Validate;
import org.jooq.Condition;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.BadCredentialsException;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static cn.luixtech.passport.server.config.AuthorizationServerConfiguration.DEFAULT_PASSWORD_ENCODER;
import static cn.luixtech.passport.server.persistence.Tables.USER;
import static cn.luixtech.passport.server.persistence.Tables.USER_AUTHORITY;
import static cn.luixtech.passport.server.utils.sort.JooqSortUtils.buildOrderBy;

/**
 * Authenticate a user from the database.
 * <p>
 * Refer below to review match password
 * DaoAuthenticationProvider#additionalAuthenticationChecks
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
    private final        MessageCreator        messageCreator;

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
        User user = dslContext.selectFrom(Tables.USER)
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
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
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

        if (CollectionUtils.isNotEmpty(authorities)) {
            // first delete user authorities
            dslContext.delete(Tables.USER_AUTHORITY)
                    .where(USER_AUTHORITY.USER_ID.eq(domain.getId()))
                    .execute();

            // then insert user authorities
            List<UserAuthority> userAuthorities = userAuthorityService.generate(domain.getId(), authorities);
            userAuthorityDao.insert(userAuthorities);
            log.info("Updated user authorities: {}", userAuthorities);
        }
        return existingOne;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
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

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void changePassword(String userId, String oldRawPassword, String newRawPassword) {
        User user = userDao.findById(userId);
        if (user == null) {
            throw new DataNotFoundException(userId);
        }

        if (StringUtils.isNotEmpty(oldRawPassword)) {
            Validate.isTrue(BCRYPT_PASSWORD_ENCODER.encode(oldRawPassword).equals(user.getPasswordHash()),
                    messageCreator.getMessage("UE5008"));
        }
        user.setPasswordHash(BCRYPT_PASSWORD_ENCODER.encode(newRawPassword));
        userDao.update(user);
        log.info("Changed password for user: {}", user);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public User requestPasswordReset(String email, String resetCode) {
        User user = dslContext.selectFrom(Tables.USER)
                .where(USER.EMAIL.eq(email))
                .and(USER.ACTIVATED.eq(true))
                .limit(1)
                // Convert User Record to POJO User
                .fetchOneInto(User.class);
        if (user == null) {
            throw new DataNotFoundException(email);
        }

        user.setResetCode(resetCode);
        user.setResetTime(LocalDateTime.now());

        userDao.update(user);
        log.info("Requested password reset by reset code {}", resetCode);
        return user;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void resetPassword(String resetCode, String newRawPassword) {
        List<User> users = userDao.fetchByResetCode(resetCode);
        if (CollectionUtils.isEmpty(users)) {
            throw new DataNotFoundException(resetCode);
        }

        users.get(0).setPasswordHash(BCRYPT_PASSWORD_ENCODER.encode(newRawPassword));
        users.get(0).setResetCode(null);
        users.get(0).setResetTime(null);

        userDao.update(users.get(0));
        log.debug("Reset password by reset code {}", resetCode);
    }

    @Override
    public Page<User> find(Pageable pageable, String username, String email, String mobileNo, Boolean enabled, Boolean activated) {
        List<User> domains = dslContext.selectFrom(Tables.USER)
                .where(createCondition(username, email, mobileNo, enabled, activated))
                .orderBy(buildOrderBy(pageable.getSort(), USER.fields()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchInto(User.class);

        return new PageImpl<>(domains, pageable, userDao.count());
    }

    @Override
    public ManagedUser findById(String id) {
        User user = userDao.findById(id);
        if (user == null) {
            throw new DataNotFoundException(id);
        }
        user.setPasswordHash("***");

        return ManagedUser.of(user, new ArrayList<>(findAuthorities(id)));
    }

    private Condition createCondition(String username, String email, String mobileNo, Boolean enabled, Boolean activated) {
        Condition condition = DSL.trueCondition();
        if (StringUtils.isNotEmpty(username)) {
            condition = condition.and(USER.USERNAME.eq(username));
        }
        if (StringUtils.isNotEmpty(email)) {
            condition = condition.and(USER.EMAIL.eq(email));
        }
        if (StringUtils.isNotEmpty(mobileNo)) {
            condition = condition.and(USER.MOBILE_NO.eq(mobileNo));
        }
        if (enabled != null) {
            condition = condition.and(USER.ENABLED.eq(enabled));
        }
        if (activated != null) {
            condition = condition.and(USER.ACTIVATED.eq(activated));
        }
        return condition;
    }
}
