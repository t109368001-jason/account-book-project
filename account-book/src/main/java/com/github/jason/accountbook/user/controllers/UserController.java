package com.github.jason.accountbook.user.controllers;

import io.swagger.v3.oas.annotations.Operation;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@ToString
@Slf4j
@RestController
@RequestMapping(path = UserController.PATH_PREFIX)
public class UserController {

  public static final String PATH_PREFIX = "/users";

  public static final String INDEX_PATH = "";

  @GetMapping(path = INDEX_PATH)
  @Operation(description = "get user")
  public Authentication user(Authentication authentication) {
    return authentication;
  }
}
