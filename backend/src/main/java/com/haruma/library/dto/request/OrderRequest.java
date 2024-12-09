package com.haruma.library.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequest {
    private AddressRequest address;
    private Long bookId;
    private Integer quantity;
}
