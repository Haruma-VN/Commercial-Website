package com.haruma.library.controller;

import com.haruma.library.dto.request.LoginRequest;
import com.haruma.library.dto.request.RegisterRequest;
import com.haruma.library.dto.response.JwtAuthResponse;
import com.haruma.library.entity.User;
import com.haruma.library.entity.UserDetail;
import com.haruma.library.service.AuthenticationService;
import com.haruma.library.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name="Authentication", description = "Authentication")
public class AuthController {

    private final UserService userService;

    private final AuthenticationService authenticationService;

    @Autowired
    public AuthController(UserService userService, AuthenticationService authenticationService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    @Operation(summary = "Regular user register an account")
    public ResponseEntity<User> registerUser(@RequestBody RegisterRequest user) {
        var newUser = userService.registerUser(user.getEmail(), user.getPassword(), UserDetail.builder().name(user.getUserDetail().getName()).build());
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    @PostMapping("/login")
    @Operation(summary = "Regular user login")
    public ResponseEntity<JwtAuthResponse> loginUser(@RequestBody LoginRequest loginRequest) throws Exception {
        var authResponse = authenticationService.login(loginRequest);
        if (authResponse == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

}
