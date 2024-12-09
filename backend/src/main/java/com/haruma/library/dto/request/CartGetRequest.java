package com.haruma.library.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartGetRequest {
    private String email;
}
