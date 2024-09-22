package com.haruma.library.controller;

import com.haruma.library.entity.User;
import com.haruma.library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> findAllUsers() {
        return new ResponseEntity<>(userService.findAllUser(), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<User> findUserById(@PathVariable("userId") Long userId) {
        var user = userService.findUserById(userId);
        return user.map(e -> new ResponseEntity<>(e, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @PostMapping("/user")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        userService.addUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/user")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<User> deleteUser(@PathVariable("userId") Long userId) {
        var user = userService.deleteUserById(userId);
        return user.map(e -> new ResponseEntity<>(e, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @PostMapping("/user/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        userService.registerUser(user.getEmail(), user.getPassword(), user.getUserDetail());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/user/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        var currentUser = userService.loginUser(user.getEmail(), user.getPassword());
        if (currentUser == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

}
