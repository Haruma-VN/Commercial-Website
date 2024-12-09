package com.haruma.library.controller;

import com.haruma.library.entity.User;
import com.haruma.library.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@Tag(name="User", description = "User API")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize(value = "hasRole('ROLE_ADMIN')")
    @Operation(summary = "Get all users possible")
    public ResponseEntity<Page<User>> findAllUsers(@RequestParam(defaultValue = "0") Integer page,
                                                   @RequestParam(defaultValue = "10") Integer limit) {
        return new ResponseEntity<>(userService.findAllUser(page, limit), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    @PreAuthorize(value = "hasRole({'ROLE_ADMIN', 'ROLE_USER'})")
    @Operation(summary = "Find a specific user by their id")
    public ResponseEntity<User> findUserById(@PathVariable("userId") Long userId) {
        var user = userService.findUserById(userId);
        return user.map(e -> new ResponseEntity<>(e, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @GetMapping("/count/{role}")
    @PreAuthorize(value = "hasRole('ROLE_ADMIN')")
    @Operation(summary = "Count number of user based on their role")
    public ResponseEntity<Long> countUserByRole(@PathVariable("role") String role) {
        return new ResponseEntity<>(userService.countUserByRole(role), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize(value = "hasRole('ROLE_ADMIN')")
    @Operation(summary = "Add a user to database")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        userService.addUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping
    @PreAuthorize(value = "hasRole('ROLE_ADMIN')")
    @Operation(summary = "Update a user from database")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize(value = "hasRole('ROLE_ADMIN')")
    @Operation(summary = "Delete a user from database")
    public ResponseEntity<User> deleteUser(@PathVariable("userId") Long userId) {
        var user = userService.deleteUserById(userId);
        return user.map(e -> new ResponseEntity<>(e, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

}
