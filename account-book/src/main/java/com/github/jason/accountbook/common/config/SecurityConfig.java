package com.github.jason.accountbook.common.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.jason.accountbook.record.controllers.RecordController;
import com.github.jason.accountbook.user.controllers.UserController;
import java.util.List;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@ToString
@Slf4j
@Configuration
@EnableWebSecurity
public class SecurityConfig {

  private final ObjectMapper mapper;

  public SecurityConfig(final ObjectMapper mapper) {
    this.mapper = mapper;

    log.info("new instance={}", this);
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }

  @Bean
  public UserDetailsService userDetailsService(SecurityProperties securityProperties,
      PasswordEncoder passwordEncoder) {
    SecurityProperties.User defaultUser = securityProperties.getUser();
    return new InMemoryUserDetailsManager(User.withUsername(defaultUser.getName())
        .password(passwordEncoder.encode(defaultUser.getPassword()))
        .roles(defaultUser.getRoles()
            .toArray(new String[0]))
        .build());
  }

  @SuppressWarnings("ResultOfMethodCallIgnored")
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.securityMatcher("**")
        .authorizeHttpRequests( //
            authz -> authz //
                .requestMatchers( //
                    "/", // home page
                    "/login", // login page
                    "/static/**", "/webjars/**", // server frontend resources
                    "/error" // for spring default BasicErrorController
                )
                .permitAll()
                .requestMatchers( //
                    UserController.PATH_PREFIX + UserController.INDEX_PATH, //
                    RecordController.PATH_PREFIX + RecordController.INDEX_PATH //
                )
                .authenticated()
                .anyRequest()
                .hasRole("ADMIN"))
        .oauth2Login(oauth2 -> oauth2.successHandler((request, response, authentication) -> {
          response.setContentType("application/json");
          response.getWriter().write(mapper.writeValueAsString(authentication));
        }))
        .formLogin(login -> login.successHandler((request, response, authentication) -> {
          response.setContentType("application/json");
          response.getWriter().write(mapper.writeValueAsString(authentication));
        })).logout(logout -> logout.logoutSuccessHandler((request, response, authentication) -> {
        }))
        .cors(cors -> Customizer.withDefaults())
        .csrf(AbstractHttpConfigurer::disable);
    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    final CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("http://localhost:3000"));
    configuration.setAllowedMethods(List.of("*"));
    // setAllowCredentials(true) is important, otherwise:
    // The value of the 'Access-Control-Allow-Origin' header in the response must
    // not be the wildcard '*' when the request's credentials mode is 'include'.
    configuration.setAllowCredentials(true);
    // setAllowedHeaders is important! Without it, OPTIONS preflight request
    // will fail with 403 Invalid CORS request
    configuration.setAllowedHeaders(List.of("*"));
    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

}
