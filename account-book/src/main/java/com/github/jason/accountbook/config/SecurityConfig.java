package com.github.jason.accountbook.config;

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

import com.github.jason.accountbook.controller.UserApi;

import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@ToString
@Slf4j
@Configuration
@EnableWebSecurity
public class SecurityConfig {
  
  @Bean
  public PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }
  
  @Bean
  public UserDetailsService userDetailsService(SecurityProperties securityProperties, PasswordEncoder passwordEncoder) {
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
                              UserApi.PATH_PREFIX + UserApi.INDEX_PATH //
                          )
                          .authenticated()
                          .anyRequest()
                          .hasRole("ADMIN"))
        .oauth2Login(oauth2 -> Customizer.withDefaults())
        .formLogin(login -> Customizer.withDefaults())
        .cors(cors -> Customizer.withDefaults())
        .csrf(AbstractHttpConfigurer::disable);
    return http.build();
  }
}
