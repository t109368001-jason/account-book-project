package com.github.jason.accountbook.common.controllers;

import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@ToString
@Slf4j
@Controller
public class IndexController {

  @Value("${spring.application.name}")
  private String appName;

  public IndexController() {
    log.info("new instance={}", this);
  }

  @GetMapping("/")
  public String indexPage(Model model) {
    log.trace("indexPage()");
    model.addAttribute("appName", appName);
    return "index";
  }
}
