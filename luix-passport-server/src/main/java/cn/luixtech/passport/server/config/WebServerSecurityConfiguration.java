package cn.luixtech.passport.server.config;

import cn.luixtech.passport.server.config.formauth.event.FormLoginSuccessEventListener;
import cn.luixtech.passport.server.config.formauth.event.FormLogoutSuccessEventListener;
import cn.luixtech.passport.server.config.formauth.event.LogoutHttpSessionEventPublisher;
import cn.luixtech.passport.server.config.formauth.handler.FormLogoutSuccessHandler;
import cn.luixtech.passport.server.config.oauth.handler.FederatedIdentityLoginSuccessHandler;
import cn.luixtech.passport.server.config.formauth.handler.FormLoginSuccessHandler;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
@AllArgsConstructor
@Configuration(proxyBeanMethods = false)
public class WebServerSecurityConfiguration {
    private final FormLoginSuccessEventListener  formLoginSuccessEventListener;
    private final FormLogoutSuccessEventListener formLogoutSuccessEventListener;

    // @formatter:off
	@Bean
	public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests(authorize ->
				authorize
					.requestMatchers("/assets/**", "/webjars/**", "/login", "/h2-console/**").permitAll()
					.anyRequest().authenticated()
			)
			.formLogin(formLogin ->
				formLogin
					.loginPage("/login")
					.successHandler(new FormLoginSuccessHandler(formLoginSuccessEventListener))
			)
			.oauth2Login(oauth2Login ->
				oauth2Login
					.loginPage("/login")
					.successHandler(new FederatedIdentityLoginSuccessHandler())
			);
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

    // @formatter:off
	@Bean
	public UserDetailsService users() {
		UserDetails user = User.withDefaultPasswordEncoder()
				.username("user")
				.password("password")
				.roles("USER")
				.build();
		return new InMemoryUserDetailsManager(user);
	}
	// @formatter:on

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new LogoutHttpSessionEventPublisher(formLogoutSuccessEventListener);
    }
}
