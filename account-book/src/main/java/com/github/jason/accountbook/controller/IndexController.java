package com.github.jason.accountbook.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class IndexController {
  @Value("${spring.application.name}")
  private String appName;
  
  public IndexController() {
    log.debug("new instance={}", this);
  }
  
  @GetMapping("/")
  public String indexPage(Model model) {
    log.trace("indexPage()");
    model.addAttribute("appName", appName);
    return "index";
  }
}
