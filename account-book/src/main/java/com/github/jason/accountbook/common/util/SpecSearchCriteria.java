package com.github.jason.accountbook.common.util;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SpecSearchCriteria {

  private boolean orPredicate;
  private String key;
  private SearchOperation operation;
  private Object value;

}
