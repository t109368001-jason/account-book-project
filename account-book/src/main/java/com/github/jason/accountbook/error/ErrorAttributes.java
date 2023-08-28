package com.github.jason.accountbook.error;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.BiConsumer;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.context.request.WebRequest;

import jakarta.validation.ConstraintViolationException;

@Component
public class ErrorAttributes extends DefaultErrorAttributes {
  
  @Override
  public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {
    final Map<Class<? extends Throwable>, BiConsumer<Map<String, Object>, Throwable>> exceptionHandlerMap = new LinkedHashMap<>();
    
    // put exception class and handling method here
    // the above has higher priority
    exceptionHandlerMap.put(BindException.class, ErrorAttributes::handleBindException);
    exceptionHandlerMap.put(ConstraintViolationException.class, ErrorAttributes::handleConstraintViolationException);
    
    // apply error to single handler
    final Map<String, Object> errorAttributes = super.getErrorAttributes(webRequest, options);
    final Throwable error = getError(webRequest);
    for (Map.Entry<Class<? extends Throwable>, BiConsumer<Map<String, Object>, Throwable>> entry : exceptionHandlerMap.entrySet()) {
      if (entry.getKey()
               .isInstance(error)) {
        entry.getValue()
             .accept(errorAttributes, error);
        break;
      } else if (ExceptionUtils.indexOfType(error, entry.getKey()) != -1) {
        entry.getValue()
             .accept(errorAttributes, ExceptionUtils.throwableOfType(error, entry.getKey()));
        break;
      }
    }
    
    // apply options (defaults)
    if (!options.isIncluded(ErrorAttributeOptions.Include.EXCEPTION)) {
      errorAttributes.remove("exception");
    }
    
    if (!options.isIncluded(ErrorAttributeOptions.Include.STACK_TRACE)) {
      errorAttributes.remove("trace");
    }
    
    if (!options.isIncluded(ErrorAttributeOptions.Include.MESSAGE) && errorAttributes.get("message") != null) {
      errorAttributes.remove("message");
    }
    
    if (!options.isIncluded(ErrorAttributeOptions.Include.BINDING_ERRORS)) {
      errorAttributes.remove("errors");
    }
    
    return errorAttributes;
  }
  
  private static void handleBindException(Map<String, Object> errorAttributes, Throwable error) {
    BindException bindException = (BindException) error;
    final Map<String, String> message = new HashMap<>();
    bindException.getBindingResult()
                 .getAllErrors()
                 .forEach((o) -> {
                   final String fieldName = ((FieldError) o).getField();
                   final String errorMessage = o.getDefaultMessage();
                   message.put(fieldName, errorMessage);
                 });
    addStatus(errorAttributes, HttpStatus.BAD_REQUEST);
    errorAttributes.put("message", message);
  }
  
  private static void handleConstraintViolationException(Map<String, Object> errorAttributes, Throwable error) {
    ConstraintViolationException constraintViolationException = (ConstraintViolationException) error;
    final Map<String, String> message = new HashMap<>();
    constraintViolationException.getConstraintViolations()
                                .forEach(constraintViolation -> {
                                  final String fieldName = constraintViolation.getPropertyPath()
                                                                              .toString();
                                  final String errorMessage = constraintViolation.getMessage();
                                  message.put(fieldName, errorMessage);
                                });
    addStatus(errorAttributes, HttpStatus.BAD_REQUEST);
    errorAttributes.put("message", message);
  }
  
  private static void addStatus(Map<String, Object> errorAttributes, HttpStatus status) {
    errorAttributes.put("status", status.value());
    errorAttributes.put("error", status.getReasonPhrase());
  }
}
