package com.github.jason.accountbook.record.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springdoc.core.converters.models.MonetaryAmount;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Record {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Embedded
  @AttributeOverride(
      name = "amount",
      column = @Column(name = "price_amount", nullable = false)
  )
  @AttributeOverride(
      name = "currency",
      column = @Column(name = "price_currency", nullable = false)
  )
  private MonetaryAmount price;

  @Column(nullable = false)
  private Long timestamp;

}
