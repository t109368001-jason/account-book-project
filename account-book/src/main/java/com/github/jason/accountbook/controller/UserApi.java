package com.github.jason.accountbook.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@ToString
@Slf4j
@RestController
@RequestMapping(path = UserApi.PATH_PREFIX)
public class UserApi {
  public static final String PATH_PREFIX = "/users";
  
  public static final String INDEX_PATH = "";
  
  @GetMapping(path = INDEX_PATH)
  @Operation(description = "get user")
  public Authentication user(Authentication authentication) {
    return authentication;
  }
}
