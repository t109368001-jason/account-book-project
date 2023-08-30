package com.github.jason.accountbook.common.vo;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springdoc.core.annotations.ParameterObject;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ParameterObject
public class SpecSearchParam {

  @Parameter(description = "use OR predicate, default:false")
  private Boolean orPredicate = false;

  @Parameter(description = "specification search string")
  private String search;

}
