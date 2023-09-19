package com.github.jason.accountbook.common.config;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Slf4j
@Configuration
public class WebConfig {

  @Bean
  public WebMvcConfigurer corsConfigurer(final CORSConfig config) {
    log.info("[BEAN] corsConfig={}", config);
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry
            .addMapping("/**")
            .allowedOrigins(config.getOrigins().toArray(new String[0]))
            .allowedMethods("*")
            .allowedHeaders("*");
      }
    };
  }
}
