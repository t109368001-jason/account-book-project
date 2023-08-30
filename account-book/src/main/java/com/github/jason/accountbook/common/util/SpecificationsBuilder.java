package com.github.jason.accountbook.common.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.jason.accountbook.common.vo.SpecSearchParam;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class SpecificationsBuilder<T> {

  public static final String DELIMITER = ",";
  public static final Pattern SPEC_PATTERN = Pattern.compile(
      "(\\w+?)(" + SearchOperation.OPERATION_SET_REGEXP + ")(\\p{Punct}?)(\\w+?)(\\p{Punct}?)"
          + DELIMITER,
      Pattern.UNICODE_CHARACTER_CLASS);

  private final Class<T> tClass;
  private final ObjectMapper mapper;
  private final List<SpecSearchCriteria> params;

  public SpecificationsBuilder(final Class<T> tClass, final ObjectMapper mapper) {
    this.tClass = tClass;
    this.mapper = mapper;
    this.params = new ArrayList<>();
  }

  public static <T> Specification<T> build(final SpecSearchParam search, final Class<T> tClass,
      final ObjectMapper mapper) {
    final SpecificationsBuilder<T> builder = new SpecificationsBuilder<>(tClass, mapper);
    final Matcher matcher = SPEC_PATTERN.matcher(search.getSearch() + DELIMITER);
    do {
      if (!matcher.find()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid search pattern");
      }
      builder.with(search.getOrPredicate(), matcher.group(1), matcher.group(2), matcher.group(4),
          matcher.group(3),
          matcher.group(5));
    } while (matcher.end() < matcher.regionEnd());
    return builder.build();
  }

  public final SpecificationsBuilder<T> with(final Boolean orPredicate, final String key,
      final SearchOperation op,
      final Object value) {
    return with(orPredicate, key, op, value, null, null);
  }

  public final SpecificationsBuilder<T> with(final Boolean orPredicate, final String key,
      final String operation,
      final Object value, final String prefix, final String suffix) {
    SearchOperation op = SearchOperation.getSimpleOperation(operation.charAt(0));
    return with(orPredicate, key, op, value, prefix, suffix);
  }

  public final SpecificationsBuilder<T> with(final Boolean orPredicate, final String key,
      SearchOperation op,
      final Object value, final String prefix, final String suffix) {
    if (op != null) {
      if (op == SearchOperation.EQUALITY) {
        final boolean startWithAsterisk =
            prefix != null && prefix.contains(SearchOperation.ZERO_OR_MORE_REGEX);
        final boolean endWithAsterisk =
            suffix != null && suffix.contains(SearchOperation.ZERO_OR_MORE_REGEX);

        if (startWithAsterisk && endWithAsterisk) {
          op = SearchOperation.CONTAINS;
        } else if (startWithAsterisk) {
          op = SearchOperation.ENDS_WITH;
        } else if (endWithAsterisk) {
          op = SearchOperation.STARTS_WITH;
        }
      }
      params.add(new SpecSearchCriteria(orPredicate, key, op, value));
    }
    return this;
  }

  public Specification<T> build() {
    if (params.isEmpty()) {
      return null;
    }

    Specification<T> result = new ABSpecification<>(tClass, mapper, params.get(0));

    for (int i = 1; i < params.size(); i++) {
      if (params.get(i)
          .isOrPredicate()) {
        result = Specification.where(result)
            .or(new ABSpecification<>(tClass, mapper, params.get(i)));
      } else {
        result = Specification.where(result)
            .and(new ABSpecification<>(tClass, mapper, params.get(i)));
      }
    }

    return result;
  }

}
