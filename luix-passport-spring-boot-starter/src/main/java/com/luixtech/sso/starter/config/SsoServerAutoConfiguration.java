package com.luixtech.sso.starter.config;

import com.luixtech.sso.starter.auth.RedisSessionDao;
import com.luixtech.sso.starter.auth.ShiroServerRealm;
import com.luixtech.sso.starter.service.AuthUserService;
import com.luixtech.sso.starter.session.TimestampSessionIdGenerator;
import com.luixtech.sso.starter.utils.AuthUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.session.mgt.eis.SessionDAO;
import org.apache.shiro.spring.config.web.autoconfigure.ShiroWebAutoConfiguration;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.RedisTemplate;

import javax.annotation.Resource;

@ConditionalOnProperty(name = "shiro.web.enabled", matchIfMissing = true)
@Slf4j
public class SsoServerAutoConfiguration extends ShiroWebAutoConfiguration {
    @Resource
    private ShiroProperties   shiroProperties;
    @Resource
    private LuixSsoProperties luixSsoProperties;
    @Resource(name = "sessionRedisTemplate")
    @SuppressWarnings({"rawtypes"})
    private RedisTemplate     redisTemplate;

    @Override
    public SessionDAO sessionDAO() {
        @SuppressWarnings({"all"})
        RedisSessionDao sessionDao = new RedisSessionDao(redisTemplate);
        sessionDao.setSessionIdGenerator(new TimestampSessionIdGenerator());
        return sessionDao;
    }

    @Bean
    public Realm realm(AuthUserService authUserService) {
        ShiroServerRealm shiroServerRealm = new ShiroServerRealm(authUserService);
        HashedCredentialsMatcher hashedCredentialsMatcher = new HashedCredentialsMatcher();
        hashedCredentialsMatcher.setHashAlgorithmName(AuthUtils.ALGORITHM_NAME);
        hashedCredentialsMatcher.setHashIterations(AuthUtils.HASH_ITERATIONS);
        shiroServerRealm.setCredentialsMatcher(hashedCredentialsMatcher);
        return shiroServerRealm;
    }

    /**
     * Refer to org.apache.shiro.spring.web.config.AbstractShiroWebFilterConfiguration.shiroFilterFactoryBean()
     *
     * @param securityManager security manager object
     * @return an {@link ShiroFilterFactoryBean} instance
     */
    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean(SecurityManager securityManager) {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setLoginUrl(shiroProperties.getLoginUrl());
        shiroFilterFactoryBean.setSuccessUrl(shiroProperties.getSuccessUrl());
        shiroFilterFactoryBean.setUnauthorizedUrl(shiroProperties.getUnauthorizedUrl());

        shiroFilterFactoryBean.setSecurityManager(securityManager);

        // Filter chain
        shiroFilterFactoryBean.setFilterChainDefinitionMap(luixSsoProperties.getServer().getFilterChainDefinitionMap());
        return shiroFilterFactoryBean;
    }
}
