package com.github.jason.accountbook.common.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.lang.reflect.Field;
import lombok.Data;
import lombok.NonNull;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Data
public class ABSpecification<T> implements Specification<T> {

  private final Class<T> tClass;
  private final ObjectMapper mapper;
  private SpecSearchCriteria criteria;

  public ABSpecification(Class<T> tClass, final ObjectMapper mapper,
      final SpecSearchCriteria criteria) {
    super();
    this.tClass = tClass;
    this.mapper = mapper;
    this.criteria = criteria;
  }

  @Override
  public Predicate toPredicate(@NonNull final Root<T> root, @NonNull final CriteriaQuery<?> query,
      @NonNull final CriteriaBuilder builder) {
    try {
      final Field field = FieldUtils.getField(tClass, criteria.getKey(), true);
      if (field == null) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
            "'" + criteria.getKey() + "' search key not found");
      }
      criteria.setValue(mapper.convertValue(criteria.getValue(), field.getType()));
    } catch (IllegalArgumentException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          "invalid value of key '" + criteria.getKey() + "'", e);
    }
    return switch (criteria.getOperation()) {
      case EQUALITY -> builder.equal(root.get(criteria.getKey()), criteria.getValue());
      case NEGATION -> builder.notEqual(root.get(criteria.getKey()), criteria.getValue());
      case GREATER_THAN -> builder.greaterThan(root.get(criteria.getKey()), criteria.getValue()
          .toString());
      case LESS_THAN -> builder.lessThan(root.get(criteria.getKey()), criteria.getValue()
          .toString());
      case LIKE -> builder.like(root.get(criteria.getKey()), criteria.getValue()
          .toString());
      case STARTS_WITH -> builder.like(root.get(criteria.getKey()), criteria.getValue() + "%");
      case ENDS_WITH -> builder.like(root.get(criteria.getKey()), "%" + criteria.getValue());
      case CONTAINS -> builder.like(root.get(criteria.getKey()), "%" + criteria.getValue() + "%");
    };
  }
}
