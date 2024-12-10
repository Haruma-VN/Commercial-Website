package com.haruma.library.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderStatusStatistic {
    private String statusName;
    private Long orderCount;
}

