package com.haruma.library.service;

import com.haruma.library.dto.request.LoginRequest;
import com.haruma.library.dto.response.JwtAuthResponse;

public interface AuthenticationService {
    JwtAuthResponse login(LoginRequest loginRequest);
}
