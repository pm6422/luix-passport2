package cn.luixtech.passport.server.config;

import cn.luixtech.passport.server.config.formauth.event.SignedInEventListener;
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

@EnableWebSecurity
@AllArgsConstructor
@Configuration(proxyBeanMethods = false)
public class WebServerSecurityConfiguration {
	private SignedInEventListener signedInEventListener;

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
					.successHandler(new FormLoginSuccessHandler(signedInEventListener))
			)
			.oauth2Login(oauth2Login ->
				oauth2Login
					.loginPage("/login")
					.successHandler(new FederatedIdentityLoginSuccessHandler())
			);
//				.logout(logout -> logout.defaultLogoutSuccessHandlerFor())

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
        return new HttpSessionEventPublisher();
    }

}
