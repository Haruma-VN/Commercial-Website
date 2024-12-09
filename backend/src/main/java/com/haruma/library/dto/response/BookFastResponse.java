package com.haruma.library.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookFastResponse {
    private Long id;
    private String title;
    private BigDecimal price;
}
