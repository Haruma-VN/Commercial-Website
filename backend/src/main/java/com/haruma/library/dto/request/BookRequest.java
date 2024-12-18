package com.haruma.library.dto.request;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookRequest {
    private Long id;
    private String title;
    private String author;
    private String description;
    private Integer quantity;
    private BigDecimal price;
    private Long categoryId;
    private String image;
}
