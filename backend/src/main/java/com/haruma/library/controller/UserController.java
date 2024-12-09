package com.haruma.library.controller;

import com.haruma.library.entity.User;
import com.haruma.library.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@Tag(name="User", description = "User API")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    @Operation(summary = "Get all users possible")
    public ResponseEntity<List<User>> findAllUsers() {
        return new ResponseEntity<>(userService.findAllUser(), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Find a specific user by their id")
    public ResponseEntity<User> findUserById(@PathVariable("userId") Long userId) {
        var user = userService.findUserById(userId);
        return user.map(e -> new ResponseEntity<>(e, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @GetMapping("/user/count/{role}")
    @Operation(summary = "Count number of user based on their role")
    public ResponseEntity<Long> countUserByRole(@PathVariable("role") String role) {
        return new ResponseEntity<>(userService.countUserByRole(role), HttpStatus.OK);
    }

    @PostMapping("/user")
    @Operation(summary = "Add a user to database")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        userService.addUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/user")
    @Operation(summary = "Update a user from database")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/user/{userId}")
    @Operation(summary = "Delete a user from database")
    public ResponseEntity<User> deleteUser(@PathVariable("userId") Long userId) {
        var user = userService.deleteUserById(userId);
        return user.map(e -> new ResponseEntity<>(e, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @PostMapping("/user/register")
    @Operation(summary = "Regular user register an account")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        var newUser = userService.registerUser(user.getEmail(), user.getPassword(), user.getUserDetail());
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    @PostMapping("/user/login")
    @Operation(summary = "Regular user login")
    public ResponseEntity<User> loginUser(@RequestBody User user) throws Exception {
        var currentUser = userService.loginUser(user.getEmail(), user.getPassword());
        if (currentUser == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

}
