package com.haruma.library.service.impl;

import com.haruma.library.dto.request.LoginRequest;
import com.haruma.library.dto.response.JwtAuthResponse;
import com.haruma.library.entity.User;
import com.haruma.library.repository.UserRepository;
import com.haruma.library.security.JwtTokenProvider;
import com.haruma.library.service.AuthenticationService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImplement implements AuthenticationService {

    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    public AuthenticationServiceImplement(UserRepository userRepository, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = new JwtTokenProvider();
    }


    @Override
    public JwtAuthResponse login(LoginRequest loginRequest){
        User user = userRepository.findUserByEmail(loginRequest.getEmail()).orElseThrow(()->new RuntimeException("User không tìm thấy"));
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(), loginRequest.getPassword()
        ));
        String jwtToken = jwtTokenProvider.generateToken(user);
        String refreshToken = jwtTokenProvider.generateToken(user);
        return JwtAuthResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .user(user)
                .build();
    }
}
