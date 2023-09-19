package com.github.jason.accountbook.common.util;

public enum SearchOperation {
  EQUALITY,
  NEGATION,
  GREATER_THAN,
  LESS_THAN,
  LIKE,
  STARTS_WITH,
  ENDS_WITH,
  CONTAINS;

  // language=RegExp
  public static final String TOKEN_DELIMITER = "\\s+";
  public static final String[] SIMPLE_OPERATION_SET = {"=", "!", ">", "<", "~"};
  public static final String OPERATION_SET_REGEXP =
      String.join("|", SearchOperation.SIMPLE_OPERATION_SET);

  public static final String OR_PREDICATE_FLAG = "'";

  public static final String ZERO_OR_MORE_REGEX = "*";

  public static final String OR_OPERATOR = "OR";

  public static final String AND_OPERATOR = "AND";

  public static final String LEFT_PARENTHESES = "(";

  public static final String RIGHT_PARENTHESES = ")";

  public static SearchOperation getSimpleOperation(final char input) {
    return switch (input) {
      case '=' -> EQUALITY;
      case '!' -> NEGATION;
      case '>' -> GREATER_THAN;
      case '<' -> LESS_THAN;
      case '~' -> LIKE;
      default -> null;
    };
  }
}
