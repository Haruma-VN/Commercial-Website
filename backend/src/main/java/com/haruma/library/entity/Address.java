package com.haruma.library.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Builder
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="address_id")
    private Long addressId;

    @Column(name="address_name", length = 255)
    private String addressName;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

}
