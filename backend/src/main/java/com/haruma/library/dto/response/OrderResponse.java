package com.haruma.library.dto.response;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {
    private Long orderId;

    private Date orderDate;
    private Integer quantity;
    private BookFastResponse book;
    private StatusResponse status;
}
