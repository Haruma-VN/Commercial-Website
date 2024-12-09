package com.haruma.library.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequest {
    
    private String email;

    private String password;

    private UserDetailRequest userDetail;

}
