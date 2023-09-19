package com.github.jason.accountbook.record.repositories;

import com.github.jason.accountbook.record.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RecordRepo extends JpaRepository<Record, Long>, JpaSpecificationExecutor<Record> {}
