package com.github.jason.accountbook.common.config;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = OAuth2Config.CONFIG_PREFIX)
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OAuth2Config {

  public static final String CONFIG_PREFIX = "oauth2";

  /**
   * Only validate host and port. Let the clients use different paths if they want to
   */
  private List<String> authorizedRedirectUris;

}
