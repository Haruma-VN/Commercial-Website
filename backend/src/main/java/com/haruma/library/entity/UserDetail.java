package com.haruma.library.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDetail {

    @Id
    @Column(name = "user_id")
    @JsonIgnore
    private Long userId;

    @Column(name="name", nullable = false)
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
