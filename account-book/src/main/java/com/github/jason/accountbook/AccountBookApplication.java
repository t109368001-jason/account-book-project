package com.github.jason.accountbook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(servers = { @Server(url = "/") })
@SpringBootApplication
public class AccountBookApplication {
  
  public static void main(String[] args) {
    SpringApplication.run(AccountBookApplication.class, args);
  }
  
}
