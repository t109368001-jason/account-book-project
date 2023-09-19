package com.github.jason.accountbook.common.controllers;

import com.github.jason.accountbook.common.services.LogFileService;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@ToString
@Slf4j
@Controller
@RequestMapping("/logs")
public class LogFilesController {

  @Value("${spring.application.name}")
  private String appName;

  private final LogFileService logFileService;

  public LogFilesController(final LogFileService logFileService) {
    this.logFileService = logFileService;

    log.info("new instance={}", this);
  }

  @GetMapping(path = "")
  public String list(@RequestParam(value = "filter", required = false) String filter, Model model) {
    log.debug("[list] filter={}", filter);
    model.addAttribute("appName", appName);
    model.addAttribute("logs", logFileService.info(filter));
    return "logs";
  }

  @GetMapping(path = "/view/{fileName:.+}")
  public ResponseEntity<FileSystemResource> view(@PathVariable("fileName") String fileName) {
    log.debug("[view] fileName={}", fileName);
    return ResponseEntity.ok(logFileService.download(fileName));
  }

  @GetMapping(path = "/download/{fileName:.+}")
  public ResponseEntity<FileSystemResource> download(@PathVariable("fileName") String fileName) {
    log.debug("[download] fileName={}", fileName);
    return ResponseEntity.ok()
        .contentType(MediaType.APPLICATION_OCTET_STREAM)
        .header("Content-Disposition", "attachment; filename=\"" + fileName + "\"")
        .body(logFileService.download(fileName));
  }

  @GetMapping(path = "/delete/{fileName:.+}")
  public String delete(@PathVariable("fileName") String fileName, Model model) {
    log.debug("[delete] fileName={}", fileName);
    logFileService.delete(fileName);
    model.addAttribute("appName", appName);
    model.addAttribute("logs", logFileService.info(null));
    return "logs";
  }
}
