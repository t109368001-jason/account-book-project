package com.github.jason.accountbook.common.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Collections;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class GenericSpecificationsBuilder {

  public static final Pattern SPEC_CRITERIA_REGEX = Pattern.compile(
      "^(\\w+[\\w.]*)?(" + SearchOperation.OPERATION_SET_REGEXP + ")(\\*?)(.+?)(\\*?)$",
      Pattern.UNICODE_CHARACTER_CLASS);

  public static <T> Specification<T> build(final String searchParam, final Class<T> tClass,
      final ObjectMapper mapper) {
    return build(parse(searchParam), tClass, mapper);
  }

  protected static Deque<?> parse(String searchParam) {
    searchParam = searchParam.trim();
    final Deque<Object> output = new LinkedList<>();
    final Deque<String> stack = new LinkedList<>();

    final String[] split = searchParam.split(SearchOperation.TOKEN_DELIMITER);
    for (String token : split) {

      if (StringUtils.equalsAnyIgnoreCase(token, SearchOperation.AND_OPERATOR,
          SearchOperation.OR_OPERATOR)) {
        while (!stack.isEmpty() && stack.peek()
            .equalsIgnoreCase(SearchOperation.AND_OPERATOR)) {
          output.push(stack.pop());
        }
        stack.push(token.equalsIgnoreCase(SearchOperation.OR_OPERATOR) ? SearchOperation.OR_OPERATOR
            : SearchOperation.AND_OPERATOR);
      } else if (token.equals(SearchOperation.LEFT_PARENTHESES)) {
        stack.push(SearchOperation.LEFT_PARENTHESES);
      } else if (token.equals(SearchOperation.RIGHT_PARENTHESES)) {
        while (true) {
          final String top = stack.peek();
          if (top == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid search pattern");
          }
          if (top.equals(SearchOperation.LEFT_PARENTHESES)) {
            break;
          }
          output.push(stack.pop());
        }
        stack.pop();
      } else {
        final Matcher matcher = SPEC_CRITERIA_REGEX.matcher(token);
        if (!matcher.find()) {
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid search pattern");
        }
        output.push(new SpecSearchCriteria(matcher.group(1), matcher.group(2), matcher.group(3),
            matcher.group(4),
            matcher.group(5)));
      }
    }

    while (!stack.isEmpty()) {
      output.push(stack.pop());
    }

    return output;
  }

  protected static <T> Specification<T> build(final Deque<?> postFixedExprStack,
      final Class<T> tClass,
      final ObjectMapper mapper) {
    final Deque<Specification<T>> specStack = new LinkedList<>();
    Collections.reverse((List<?>) postFixedExprStack);

    while (!postFixedExprStack.isEmpty()) {
      final Object mayBeOperand = postFixedExprStack.pop();

      if (!(mayBeOperand instanceof String)) {
        specStack.push(
            new GenericSpecification<>(tClass, mapper, (SpecSearchCriteria) mayBeOperand));
      } else {
        final Specification<T> operand1 = specStack.pop();
        final Specification<T> operand2 = specStack.pop();
        if (mayBeOperand.equals(SearchOperation.AND_OPERATOR)) {
          specStack.push(Specification.where(operand1)
              .and(operand2));
        } else if (mayBeOperand.equals(SearchOperation.OR_OPERATOR)) {
          specStack.push(Specification.where(operand1)
              .or(operand2));
        }
      }

    }
    return specStack.pop();
  }
}
