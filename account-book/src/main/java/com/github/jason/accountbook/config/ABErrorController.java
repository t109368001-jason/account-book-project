package com.github.jason.accountbook.config;

import java.util.Map;

import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.ServletWebRequest;

import jakarta.servlet.http.HttpServletRequest;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@ToString
@Slf4j
@Component
public class ABErrorController extends BasicErrorController {
  
  private final ErrorAttributes errorAttributes;
  
  public ABErrorController(ErrorAttributes errorAttributes, ServerProperties serverProperties) {
    super(errorAttributes, serverProperties.getError());
    this.errorAttributes = errorAttributes;
    
    log.info("new instance={}", this);
  }
  
  @RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  @Override
  public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
    HttpStatus status = getStatus(request);
    final Throwable error = errorAttributes.getError(new ServletWebRequest(request));
    if (status == HttpStatus.NO_CONTENT) {
      log.warn("[RES]", error);
      return new ResponseEntity<>(status);
    }
    Map<String, Object> body = getErrorAttributes(request, getErrorAttributeOptions(request, MediaType.ALL));
    if (status.is5xxServerError()) {
      log.error("[RES] res={}", body, error);
    } else {
      log.warn("[RES] res={}", body, error);
    }
    return new ResponseEntity<>(body, status);
  }
}
