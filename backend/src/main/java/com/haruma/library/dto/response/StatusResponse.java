package com.haruma.library.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StatusResponse {
    private Integer statusId;
    private String statusName;
}
