package cn.luixtech.passport.server.config;

import cn.luixtech.passport.server.config.oauth.handler.FederatedIdentityLoginSuccessHandler;
import cn.luixtech.passport.server.config.security.CsrfRequestMatcher;
import cn.luixtech.passport.server.event.FederatedIdentityLoginSuccessEventListener;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Use org.springframework.security.crypto.password.DelegatingPasswordEncoder as default
 */
@EnableWebSecurity
@EnableMethodSecurity
@AllArgsConstructor
@Configuration(proxyBeanMethods = false)
public class WebServerSecurityConfiguration {

//    /**
//     * Refer to <a href="https://docs.spring.io/spring-security/reference/servlet/authorization/method-security.html">Using a Custom Authorization Manager</a>
//     *
//     * @param manager DynamicAuthorizationManager
//     * @return Advisor
//     */
//    @Bean
//    public Advisor preAuthorize(@Lazy DynamicAuthorizationManager manager) {
//        return AuthorizationManagerBeforeMethodInterceptor.preAuthorize(manager);
//    }

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
			// Integrate both resource server and auth server
			.oauth2ResourceServer(server-> server.jwt(Customizer.withDefaults()))
			.authorizeHttpRequests(authorize ->
				authorize
					.requestMatchers("favicon.ico", "/assets/**", "/webjars/**", "/login").permitAll()
					.requestMatchers("/management/health/**").permitAll()
					.requestMatchers("/open-api/**").permitAll()
					.requestMatchers("/api/third-party-clients/user").hasAuthority("SCOPE_profile")
					.requestMatchers("/api/third-party-clients/authorities").hasAuthority("SCOPE_message.read")
//					.requestMatchers("/userinfo").hasAuthority("SCOPE_message.read")
					.requestMatchers("/swagger-ui/**").hasAuthority("ROLE_DEVELOPER")
					.requestMatchers("/v3/api-docs/**").hasAuthority("ROLE_DEVELOPER")
					.anyRequest().authenticated()
			)
			.csrf(csrf-> csrf
					.ignoringRequestMatchers("/open-api/**")
					// Solve post/delete forbidden issue for request from swagger
					.requireCsrfProtectionMatcher(new CsrfRequestMatcher()))
			.formLogin(formLogin ->
				formLogin
					.loginPage("/login")
			)
			.oauth2Login(oauth2Login ->
				oauth2Login
					.loginPage("/login")
					.successHandler(new FederatedIdentityLoginSuccessHandler(new FederatedIdentityLoginSuccessEventListener()))
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
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }
}
