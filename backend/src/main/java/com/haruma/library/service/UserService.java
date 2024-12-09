package com.haruma.library.service;

import com.haruma.library.entity.User;
import com.haruma.library.entity.UserDetail;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User registerUser(String email, String rawPassword, UserDetail userDetail);
    
    List<User> findAllUser();

    void addUser(User user);

    Optional<User> findUserById(Long id);

    Optional<User> updateUser(User user);

    Optional<User> deleteUserById(Long id);

    Long countUserByRole(String role);

}
