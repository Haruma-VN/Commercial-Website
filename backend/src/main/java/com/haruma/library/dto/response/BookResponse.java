package com.haruma.library.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookResponse {
    private Long id;
    private String title;
    private String author;
    private String description;
    private Integer quantity;
    private BigDecimal price;
    private Long categoryId;
    private String image;

}
