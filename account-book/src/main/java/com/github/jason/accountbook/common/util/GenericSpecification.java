package com.github.jason.accountbook.common.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.From;
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
public class GenericSpecification<T> implements Specification<T> {

  private final Class<T> tClass;
  private final ObjectMapper mapper;
  private SpecSearchCriteria criteria;

  public GenericSpecification(
      Class<T> tClass, final ObjectMapper mapper, final SpecSearchCriteria criteria) {
    super();
    this.tClass = tClass;
    this.mapper = mapper;
    this.criteria = criteria;
  }

  @Override
  public Predicate toPredicate(
      @NonNull final Root<T> root,
      @NonNull final CriteriaQuery<?> query,
      @NonNull final CriteriaBuilder builder) {
    String key = criteria.getKey();
    Object value = criteria.getValue();
    Class<?> valueType = tClass;
    From<?, ?> from = root;
    if (criteria.getKey().contains(".")) {
      final String[] keys = criteria.getKey().split("\\.");
      for (int i = 0; i < keys.length; i++) {
        final String _key = keys[i];
        final Field field = FieldUtils.getField(valueType, _key, true);
        if (field == null) {
          throw new ResponseStatusException(
              HttpStatus.BAD_REQUEST, "'" + criteria.getKey() + "' search key not found");
        }
        key = _key;
        valueType = field.getType();
        if (i < (keys.length - 1)) {
          from = from.join(_key);
        }
      }
    } else {
      final Field field = FieldUtils.getField(tClass, key, true);
      if (field == null) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST, "'" + criteria.getKey() + "' search key not found");
      }
      valueType = field.getType();
    }
    try {
      value = mapper.convertValue(value, valueType);
    } catch (IllegalArgumentException e) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST, "invalid value of key '" + criteria.getKey() + "'", e);
    }
    return switch (criteria.getOperation()) {
      case EQUALITY -> builder.equal(from.get(key), value);
      case NEGATION -> builder.notEqual(from.get(key), value);
      case GREATER_THAN -> builder.greaterThan(from.get(key), value.toString());
      case LESS_THAN -> builder.lessThan(from.get(key), value.toString());
      case LIKE -> builder.like(from.get(key), value.toString());
      case STARTS_WITH -> builder.like(from.get(key), value + "%");
      case ENDS_WITH -> builder.like(from.get(key), "%" + value);
      case CONTAINS -> builder.like(from.get(key), "%" + value + "%");
    };
  }
}
