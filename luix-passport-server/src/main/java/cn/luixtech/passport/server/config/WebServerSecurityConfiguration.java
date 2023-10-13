package cn.luixtech.passport.server.config;

import cn.luixtech.passport.server.config.formauth.event.FormLoginSuccessEventListener;
import cn.luixtech.passport.server.config.formauth.event.FormLogoutSuccessEventListener;
import cn.luixtech.passport.server.config.formauth.event.LogoutHttpSessionEventPublisher;
import cn.luixtech.passport.server.config.formauth.handler.FormLoginSuccessHandler;
import cn.luixtech.passport.server.config.oauth.handler.FederatedIdentityLoginSuccessHandler;
import cn.luixtech.passport.server.config.oauth.service.CustomUserDetailsService;
import cn.luixtech.passport.server.service.AuthUserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
@AllArgsConstructor
@Configuration(proxyBeanMethods = false)
public class WebServerSecurityConfiguration {
    private final FormLoginSuccessEventListener  formLoginSuccessEventListener;
    private final FormLogoutSuccessEventListener formLogoutSuccessEventListener;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) ->
                web.ignoring()
                        // Remove below if remove H2
                        // requestMatchers("/h2-console/**") does NOT work, because there are query string in URL
                        // h2-console/login.do?jsessionid=f9c70ca0904f0960ff233ceca108853d
                        .requestMatchers(new AntPathRequestMatcher("/h2-console/**"));
    }

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
					.successHandler(new FormLoginSuccessHandler(formLoginSuccessEventListener))
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
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

    @Bean
    public UserDetailsService userDetailsService(AuthUserService authUserService) {
//		UserDetails user = User.withDefaultPasswordEncoder()
//				.username("user")
//				.password("password")
//				.roles("USER")
//				.build();
//		return new InMemoryUserDetailsManager(user);
        return new CustomUserDetailsService(authUserService);
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new LogoutHttpSessionEventPublisher(formLogoutSuccessEventListener);
    }
}
