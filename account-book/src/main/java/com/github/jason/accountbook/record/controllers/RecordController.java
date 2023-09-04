package com.github.jason.accountbook.record.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.jason.accountbook.common.util.GenericSpecificationsBuilder;
import com.github.jason.accountbook.common.vo.SpecSearchParam;
import com.github.jason.accountbook.record.entity.Record;
import com.github.jason.accountbook.record.repositories.RecordRepo;
import jakarta.validation.Valid;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@ToString
@Slf4j
@Validated
@RestController
@RequestMapping(path = RecordController.PATH_PREFIX)
public class RecordController {

  public static final String PATH_PREFIX = "/records";

  public static final String INDEX_PATH = "";

  private final ObjectMapper mapper;
  private final RecordRepo repo;

  public RecordController(final ObjectMapper mapper, final RecordRepo repo) {
    this.mapper = mapper;
    this.repo = repo;

    log.info("new instance={}", this);
  }

  @GetMapping(INDEX_PATH)
  public Page<Record> findBySpecAndPage(@ParameterObject final SpecSearchParam param,
      @ParameterObject final Pageable pageable) {
    log.info("[REQ] findBySpecAndPage() param={}, pageable={}", param, pageable);
    final Page<Record> res;
    if (StringUtils.isNotBlank(param.getSearch())) {
      final Specification<Record> spec = GenericSpecificationsBuilder.build(param.getSearch(),
          Record.class, mapper);
      res = repo.findAll(spec, pageable);
    } else {
      res = repo.findAll(pageable);
    }
    log.info("[RES] findBySpecAndPage() res={}", res);
    return res;
  }

  @PostMapping(INDEX_PATH)
  public Record add(@Valid @RequestBody final Record record) {
    log.info("[REQ] add() record={}", record);
    repo.save(record);
    log.info("[RES] add() record={}", record);
    return record;
  }

}
