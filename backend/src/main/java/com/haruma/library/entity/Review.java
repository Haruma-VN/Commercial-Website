package com.haruma.library.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.*;

@Entity
@Table(name="review")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", nullable = false)
    private Long id;

    @Column(name="date")
    @CreationTimestamp
    private Date date;

    @Column(name="rating", nullable = false)
    private Double rating;

    @Column(name="review_description", nullable = false)
    private String description;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "book_id")
    @JsonIgnore
    private Book book;

    @ManyToMany(mappedBy = "reviews")
    @JsonIgnore
    private List<User> users = new ArrayList<>();

}
