package com.luixtech.sso.starter.config;

import com.luixtech.sso.starter.auth.RedisSessionDao;
import com.luixtech.sso.starter.auth.ShiroClientRealm;
import com.luixtech.sso.starter.filter.SsoClientLoginFilter;
import com.luixtech.sso.starter.filter.SsoClientLogoutFilter;
import com.luixtech.sso.starter.session.TimestampSessionIdGenerator;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.session.mgt.eis.SessionDAO;
import org.apache.shiro.spring.config.web.autoconfigure.ShiroWebAutoConfiguration;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.RedisTemplate;

import javax.annotation.Resource;
import javax.servlet.Filter;
import java.util.LinkedHashMap;
import java.util.Map;

@ConditionalOnProperty(name = "shiro.web.enabled", matchIfMissing = true)
@Slf4j
public class SsoClientAutoConfiguration extends ShiroWebAutoConfiguration {
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
    public Realm realm() {
        return new ShiroClientRealm();
    }

    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean(SecurityManager securityManager) {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setLoginUrl(shiroProperties.getLoginUrl());
        shiroFilterFactoryBean.setSuccessUrl(shiroProperties.getSuccessUrl());
        shiroFilterFactoryBean.setUnauthorizedUrl(shiroProperties.getUnauthorizedUrl());

        shiroFilterFactoryBean.setSecurityManager(securityManager);

        // User defined filers
        Map<String, Filter> filtersMap = new LinkedHashMap<>();
        filtersMap.put("ssoClientLoginFilter", new SsoClientLoginFilter(
                luixSsoProperties.getServer().getUrl(),
                shiroProperties.getLoginUrl(),
                shiroProperties.getSuccessUrl()));
        filtersMap.put("ssoClientLogoutFilter", new SsoClientLogoutFilter(luixSsoProperties.getServer().getUrl()));

        shiroFilterFactoryBean.setFilters(filtersMap);

        // Filter chain
        shiroFilterFactoryBean.setFilterChainDefinitionMap(luixSsoProperties.getClient().getFilterChainDefinitionMap());
        return shiroFilterFactoryBean;
    }
}
