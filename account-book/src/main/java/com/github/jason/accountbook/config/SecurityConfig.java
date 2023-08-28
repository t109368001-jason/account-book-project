package com.github.jason.accountbook.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
  
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
                          .anyRequest()
                          .hasRole("ADMIN"))
        .formLogin(login -> Customizer.withDefaults())
        .cors(cors -> Customizer.withDefaults())
        .csrf(AbstractHttpConfigurer::disable);
    return http.build();
  }
}
