package cn.luixtech.passport.server.config;

import cn.luixtech.passport.server.config.oauth.handler.FederatedIdentityLoginSuccessHandler;
import cn.luixtech.passport.server.service.impl.JdbcUserDetailsService;
import cn.luixtech.passport.server.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Use org.springframework.security.crypto.password.DelegatingPasswordEncoder as default
 */
@EnableWebSecurity
@AllArgsConstructor
@Configuration(proxyBeanMethods = false)
public class WebServerSecurityConfiguration {

//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) ->
//                web.ignoring()
//                        // Remove below if remove H2
//                        // requestMatchers("/h2-console/**") does NOT work, because there are query string in URL
//                        // h2-console/login.do?jsessionid=f9c70ca0904f0960ff233ceca108853d
//                        .requestMatchers(new AntPathRequestMatcher("/h2-console/**"));
//    }

    // @formatter:off
	@Bean
	public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests(authorize ->
				authorize
					.requestMatchers("/assets/**", "/webjars/**", "/login").permitAll()
//					.requestMatchers("/api/**").authenticated()
					.anyRequest().authenticated()
			)
			.formLogin(formLogin ->
				formLogin
					.loginPage("/login")
			)
			.oauth2Login(oauth2Login ->
				oauth2Login
					.loginPage("/login")
					.successHandler(new FederatedIdentityLoginSuccessHandler())
			);
//			.headers(headers->headers.frameOptions(x->x.sameOrigin()));
		/*
		 * If you request POST /logout, then it will perform the following default operations using a series of LogoutHandlers:
		 *	Invalidate the HTTP session (SecurityContextLogoutHandler)
		 *	Clear the SecurityContextHolderStrategy (SecurityContextLogoutHandler)
		 *	Clear the SecurityContextRepository (SecurityContextLogoutHandler)
		 *	Clean up any RememberMe authentication (TokenRememberMeServices / PersistentTokenRememberMeServices)
		 *	Clear out any saved CSRF token (CsrfLogoutHandler)
		 *	Fire a LogoutSuccessEvent (LogoutSuccessEventPublishingLogoutHandler)
		 */
//			.logout(logout->
//				logout.logoutSuccessHandler(new FormLogoutSuccessHandler("/login?logout"))
//			);
		return http.build();
	}
	// @formatter:on

    @Bean
    public UserDetailsService userDetailsService(UserService userService) {
        return new JdbcUserDetailsService(userService);
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }
}
