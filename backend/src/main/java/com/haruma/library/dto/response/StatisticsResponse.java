package com.haruma.library.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StatisticsResponse {
    private Date date;
    private BigDecimal totalPrice;
    private BigDecimal count;
}

