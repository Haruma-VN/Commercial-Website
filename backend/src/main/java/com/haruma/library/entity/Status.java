package com.haruma.library.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="status")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Builder
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="status_id", nullable=false)
    private Integer statusId;

    @Column(name="status_name", length = 100)
    private String statusName;

    @OneToOne(mappedBy = "status")
    @JsonIgnore
    private Order order;

}
