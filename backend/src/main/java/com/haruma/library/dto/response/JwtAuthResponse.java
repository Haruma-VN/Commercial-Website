package com.haruma.library.dto.response;

import com.haruma.library.entity.User;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtAuthResponse {
    private String accessToken;
    private String refreshToken;
    private User user;
}
