package cn.luixtech.passport.server.service.impl;

import cn.luixtech.passport.server.config.oauth.AuthUser;
import cn.luixtech.passport.server.exception.UserNotActivatedException;
import cn.luixtech.passport.server.persistence.Tables;
import cn.luixtech.passport.server.persistence.tables.daos.UserDao;
import cn.luixtech.passport.server.persistence.tables.daos.UserPreferenceDao;
import cn.luixtech.passport.server.persistence.tables.daos.UserRoleDao;
import cn.luixtech.passport.server.persistence.tables.pojos.User;
import cn.luixtech.passport.server.persistence.tables.pojos.UserPreference;
import cn.luixtech.passport.server.persistence.tables.pojos.UserRole;
import cn.luixtech.passport.server.persistence.tables.records.UserRecord;
import cn.luixtech.passport.server.pojo.ManagedUser;
import cn.luixtech.passport.server.pojo.ProfileScopeUser;
import cn.luixtech.passport.server.service.UserRoleService;
import cn.luixtech.passport.server.service.UserService;
import cn.luixtech.passport.server.utils.AuthUtils;
import com.luixtech.springbootframework.component.MessageCreator;
import com.luixtech.uidgenerator.core.id.IdGenerator;
import com.luixtech.utilities.encryption.JasyptEncryptUtils;
import com.luixtech.utilities.exception.DataNotFoundException;
import com.luixtech.utilities.exception.DuplicationException;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.Validate;
import org.jooq.Condition;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
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
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.TemporalUnit;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static cn.luixtech.passport.server.config.AuthorizationServerConfiguration.DEFAULT_PASSWORD_ENCODER_PREFIX;
import static cn.luixtech.passport.server.controller.UserPhotoController.USER_PHOTO_TOKEN_KEY;
import static cn.luixtech.passport.server.controller.UserPhotoController.USER_PHOTO_URL;
import static cn.luixtech.passport.server.persistence.Tables.USER;
import static cn.luixtech.passport.server.utils.sort.JooqSortUtils.buildOrderBy;
import static com.luixtech.springbootframework.utils.NetworkUtils.getRequestUrl;
import static com.luixtech.utilities.encryption.JasyptEncryptUtils.DEFAULT_ALGORITHM;
import static org.apache.commons.lang3.time.DateFormatUtils.ISO_8601_EXTENDED_DATETIME_TIME_ZONE_FORMAT;

/**
 * Authenticate a user from the database.
 * <p>
 * Refer below to review match password
 * DaoAuthenticationProvider#additionalAuthenticationChecks
 */
@Slf4j
@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    public static final BCryptPasswordEncoder BCRYPT_PASSWORD_ENCODER = new BCryptPasswordEncoder();
    @Resource
    private             DSLContext            dslContext;
    @Resource
    private             UserDao               userDao;
    @Resource
    private             UserRoleDao           userRoleDao;
    @Resource
    private             UserPreferenceDao     userPreferenceDao;
    @Resource
    private             UserRoleService       userRoleService;
    @Resource
    private             MessageCreator        messageCreator;
    @Resource
    private             HttpServletRequest    httpServletRequest;
    private             PasswordEncoder       passwordEncoder         = PasswordEncoderFactories.createDelegatingPasswordEncoder();
    @Value("${spring.web.locale}")
    private             String                defaultLocale;

    @Override
    public UserDetails loadUserByUsername(final String loginName) {
        log.info("Authenticating {}", loginName);
        if (StringUtils.isEmpty(loginName)) {
            log.warn("Login name must not be empty!");
            throw new BadCredentialsException("Login name must not be empty");
        }
        User user = findOne(loginName)
                .orElseThrow(() -> new UsernameNotFoundException("User " + loginName + " was not found"));
        if (!Boolean.TRUE.equals(user.getActivated())) {
            throw new UserNotActivatedException(loginName);
        }

        boolean accountNonExpired = user.getAccountExpiresAt() == null || LocalDateTime.now().isBefore(user.getAccountExpiresAt());
        boolean passwordNonExpired = user.getPasswordExpiresAt() == null || LocalDateTime.now().isBefore(user.getPasswordExpiresAt());

        Set<String> roles = findRoles(user.getId());
        List<GrantedAuthority> authorities = roles
                .stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        Set<String> teamIds = findTeamIds(user.getId());

        UserPreference userPreference = userPreferenceDao.findById(user.getId());
        String locale = userPreference != null ? userPreference.getLocale() : "";
        String modifiedTime = ISO_8601_EXTENDED_DATETIME_TIME_ZONE_FORMAT.format(user.getModifiedTime().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli());

        String photoUrl = null;
        if (httpServletRequest != null) {
            photoUrl = getRequestUrl(httpServletRequest) + USER_PHOTO_URL + JasyptEncryptUtils.encrypt(user.getId(), DEFAULT_ALGORITHM, USER_PHOTO_TOKEN_KEY);
        }
        return new AuthUser(user.getId(), user.getUsername(),
                user.getEmail(), user.getMobileNo(), user.getFirstName(), user.getLastName(), user.getPasswordHash(),
                user.getEnabled(), accountNonExpired, passwordNonExpired,
                true, photoUrl, locale, modifiedTime, authorities, roles, teamIds);
    }

    @Override
    public Optional<User> findOne(String loginName) {
        User user = dslContext.selectFrom(Tables.USER)
                .where(USER.USERNAME.eq(loginName))
                .or(USER.EMAIL.eq(loginName))
                .limit(1)
                // Convert User Record to POJO User
                .fetchOneInto(User.class);
        return Optional.ofNullable(user);
    }

    @Override
    public ManagedUser findById(String id) {
        User user = Optional.ofNullable(userDao.findById(id)).orElseThrow(() -> new DataNotFoundException(id));
        user.setPasswordHash("*");
        ManagedUser managedUser = new ManagedUser();
        BeanUtils.copyProperties(user, managedUser);
        managedUser.setRoles(findRoles(id));

        UserPreference preference = userPreferenceDao.findById(id);
        // default handing
        managedUser.setLocale(preference.getLocale());
        managedUser.setTimezone(preference.getTimeZone());
        return managedUser;
    }

    @Override
    public ProfileScopeUser findByUsername(String username) {
        User user = Optional.ofNullable(userDao.fetchOneByUsername(username)).orElseThrow(() -> new DataNotFoundException(username));
        return ProfileScopeUser.of(user.getUsername(), user.getEmail(), findRoles(user.getId()));
    }

    @Override
    public Set<String> findRoles(String userId) {
        return dslContext.select(Tables.USER_ROLE.ROLE)
                .from(Tables.USER_ROLE)
                .where(Tables.USER_ROLE.USER_ID.eq(userId))
                .fetchSet(Tables.USER_ROLE.ROLE);
    }

    @Override
    public Set<String> findTeamIds(String userId) {
        return dslContext.select(Tables.TEAM_USER.TEAM_ID)
                .from(Tables.TEAM_USER)
                .where(Tables.TEAM_USER.USER_ID.eq(userId))
                .fetchSet(Tables.TEAM_USER.TEAM_ID);
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
    public User insert(User domain, Set<String> authorities, String rawPassword, boolean permanentAccount) {
        // From pojo to record
        UserRecord userRecord = dslContext.newRecord(USER, domain);

        if (userDao.fetchOneByUsername(domain.getUsername().toLowerCase()) != null) {
            throw new DuplicationException(Map.of("username", domain.getUsername()));
        }
        if (userDao.fetchOneByEmail(domain.getEmail()) != null) {
            throw new DuplicationException(Map.of("email", domain.getEmail()));
        }
        if (userDao.fetchOneByMobileNo(domain.getMobileNo()) != null) {
            throw new DuplicationException(Map.of("mobileNo", domain.getMobileNo()));
        }

        String id = IdGenerator.generateId();
        domain.setId(id);
        domain.setUsername(domain.getUsername().toLowerCase());
        domain.setEmail(domain.getEmail().toLowerCase());
        domain.setPasswordHash(DEFAULT_PASSWORD_ENCODER_PREFIX + BCRYPT_PASSWORD_ENCODER.encode(rawPassword));
        domain.setActivationCode(generateRandomCode());
        domain.setResetCode(null);
        domain.setResetTime(null);
        domain.setProfilePhotoEnabled(false);
        domain.setActivated(false);
        domain.setEnabled(true);
        domain.setPasswordExpiresAt(LocalDateTime.now().plusMonths(6));
        if (!permanentAccount) {
            domain.setAccountExpiresAt(LocalDateTime.now().plusDays(30));
        }

        userDao.insert(domain);
        log.info("Created user: {}", domain);

        List<UserRole> userAuthorities = userRoleService.generate(id, authorities);
        userRoleDao.insert(userAuthorities);

        UserPreference userPreference = new UserPreference();
        userPreference.setUserId(id);
        userPreference.setLocale(defaultLocale);
        userPreference.setDateFormat("2021-09-10 10:15:00");
        userPreference.setTimeZone("Asia/Shanghai (GMT +08:00)");
        userPreferenceDao.insert(userPreference);

        return domain;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public User update(User domain) {
        User existingOne = Optional.ofNullable(userDao.findById(domain.getId())).orElseThrow(() -> new DataNotFoundException(domain.getId()));

        int existingEmailCount = dslContext.fetchCount(DSL.selectFrom(Tables.USER)
                .where(USER.EMAIL.eq(domain.getEmail()))
                .and(USER.ID.ne(domain.getId())));
        if (existingEmailCount > 0) {
            throw new DuplicationException(Map.of("email", domain.getEmail()));
        }
        int existingMobileNoCount = dslContext.fetchCount(DSL.selectFrom(Tables.USER)
                .where(USER.MOBILE_NO.eq(domain.getEmail()))
                .and(USER.ID.ne(domain.getId())));
        if (existingMobileNoCount > 0) {
            throw new DuplicationException(Map.of("mobileNo", domain.getMobileNo()));
        }

        existingOne.setFirstName(domain.getFirstName());
        existingOne.setLastName(domain.getLastName());
        existingOne.setEmail(domain.getEmail().toLowerCase());
        existingOne.setMobileNo(domain.getMobileNo());
        existingOne.setEnabled(domain.getEnabled());
        existingOne.setRemarks(domain.getRemarks());
        existingOne.setModifiedBy(AuthUtils.getCurrentUsername());
        existingOne.setModifiedTime(LocalDateTime.now());

        userDao.update(existingOne);
        log.debug("Updated user: {}", domain);
        return existingOne;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public User update(User domain, Set<String> roles) {
        User updated = update(domain);
        if (CollectionUtils.isNotEmpty(roles)) {
            // first delete user authorities
            userRoleService.deleteByUserId(domain.getId());

            // then insert user authorities
            List<UserRole> userRoles = userRoleService.generate(domain.getId(), roles);
            userRoleDao.insert(userRoles);
            log.info("Updated user authorities: {}", userRoles);
        }
        return updated;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public User changePassword(String id, String oldRawPassword, String newRawPassword) {
        User user = Optional.ofNullable(userDao.findById(id)).orElseThrow(() -> new DataNotFoundException(id));
        if (StringUtils.isNotEmpty(oldRawPassword)) {
            try {
                if (!passwordEncoder.matches(oldRawPassword, user.getPasswordHash())) {
                    throw new IllegalArgumentException(messageCreator.getMessage("UE5008"));
                }
            } catch (Exception ex) {
                throw new IllegalArgumentException(messageCreator.getMessage("UE5008"));
            }
        }
        user.setPasswordHash(BCRYPT_PASSWORD_ENCODER.encode(newRawPassword));
        userDao.update(user);
        log.info("Changed password for user: {}", user);
        return user;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public User requestPasswordRecovery(String email) {
        User user = dslContext.selectFrom(Tables.USER)
                .where(USER.EMAIL.eq(email))
                .and(USER.ACTIVATED.eq(true))
                .limit(1)
                // Convert User Record to POJO User
                .fetchOneInto(User.class);
        if (user == null) {
            throw new DataNotFoundException(email);
        }

        user.setResetCode(JasyptEncryptUtils.encrypt(generateRandomCode()));
        user.setResetTime(LocalDateTime.now());

        userDao.update(user);
        log.info("Requested password reset by reset code {}", user.getResetCode());
        return user;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void resetPassword(String resetCode, String newRawPassword) {
        User user = dslContext.selectFrom(Tables.USER)
                .where(USER.RESET_CODE.eq(resetCode))
                .limit(1)
                // Convert User Record to POJO User
                .fetchOneInto(User.class);
        Validate.isTrue(user != null, messageCreator.getMessage("UE1022"));
        Validate.isTrue(LocalDateTime.now().isBefore(user.getResetTime().plusDays(1)), messageCreator.getMessage("UE1023"));

        user.setPasswordHash(BCRYPT_PASSWORD_ENCODER.encode(newRawPassword));
        user.setResetCode(null);
        user.setResetTime(null);

        userDao.update(user);
        log.debug("Reset password by reset code {}", resetCode);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void activate(String activationCode) {
        User user = dslContext.selectFrom(Tables.USER)
                .where(USER.ACTIVATION_CODE.eq(activationCode))
                .limit(1)
                // Convert User Record to POJO User
                .fetchOneInto(User.class);
        Validate.isTrue(user != null, messageCreator.getMessage("UE1024"));

        user.setActivated(true);
        user.setActivationCode(null);
        userDao.update(user);
        log.info("Activated user by activation code {}", activationCode);
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

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void deleteById(String userId) {
        userDao.deleteById(userId);
    }

    @Override
    public String generateRandomCode() {
        return RandomStringUtils.randomAlphanumeric(4).toUpperCase() +
                "-" + RandomStringUtils.randomAlphanumeric(4).toUpperCase()
                + "-" + RandomStringUtils.randomAlphanumeric(4).toUpperCase()
                + "-" + RandomStringUtils.randomAlphanumeric(4).toUpperCase()
                + "-" + RandomStringUtils.randomAlphanumeric(4).toUpperCase();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public User extendAccount(String id, long amountToAdd, TemporalUnit unit) {
        User user = Optional.ofNullable(userDao.findById(id)).orElseThrow(() -> new DataNotFoundException(id));
        if (user.getAccountExpiresAt().isBefore(LocalDateTime.now())) {
            user.setAccountExpiresAt(LocalDateTime.now().plus(amountToAdd, unit));
        } else {
            user.setAccountExpiresAt(user.getAccountExpiresAt().plus(amountToAdd, unit));
        }
        userDao.update(user);
        return user;
    }
}
