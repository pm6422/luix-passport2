package cn.luixtech.passport.server.config.oauth.service;

import cn.luixtech.passport.server.config.domain.AuthUser;
import cn.luixtech.passport.server.exception.UserNotActivatedException;
import cn.luixtech.passport.server.persistence.tables.pojos.User;
import cn.luixtech.passport.server.service.AuthUserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Authenticate a user from the database.
 */
@Slf4j
@AllArgsConstructor
public class CustomUserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    private final AuthUserService authUserService;

    @Override
//    @Transactional(propagation = Propagation.REQUIRED, readOnly = true, noRollbackFor = Exception.class)
    public UserDetails loadUserByUsername(final String login) {
        log.debug("Authenticating {}", login);
        if (StringUtils.isEmpty(login)) {
            log.warn("login must not be empty!");
            throw new BadCredentialsException("login must not be empty");
        }
        User user = authUserService.findOne(login)
                .orElseThrow(() -> new UsernameNotFoundException("User " + login + " was not found"));
        if (!Boolean.TRUE.equals(user.getActivated())) {
            throw new UserNotActivatedException(login);
        }
        List<GrantedAuthority> grantedAuthorities = authUserService.findRoles(user.getId())
                .stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(user.getUsername(),
                user.getPasswordHash(), user.getEnabled(),
                true, true,
                true, grantedAuthorities);
    }
}
