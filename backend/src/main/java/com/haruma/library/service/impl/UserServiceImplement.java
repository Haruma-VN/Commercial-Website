package com.haruma.library.service.impl;

import com.haruma.library.entity.Cart;
import com.haruma.library.entity.Role;
import com.haruma.library.entity.UserDetail;
import com.haruma.library.repository.CartRepository;
import com.haruma.library.repository.RoleRepository;
import com.haruma.library.repository.UserRepository;
import com.haruma.library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.haruma.library.entity.User;

import javax.swing.text.html.Option;
import java.util.*;

@Service
public class UserServiceImplement implements UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    private final CartRepository cartRepository;

    private final RoleRepository roleRepository;

    @Autowired
    public UserServiceImplement(PasswordEncoder passwordEncoder, UserRepository userRepository, CartRepository cartRepository, RoleRepository roleRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public User registerUser(String email, String rawPassword, UserDetail userDetail) {
        var hashedPassword = passwordEncoder.encode(rawPassword);
        var user = new User();
        user.setEmail(email);
        user.setPassword(hashedPassword);
        user.setUserDetail(userDetail);
        userDetail.setUser(user);
        var roles = new ArrayList<Role>();
        roles.add(this.roleRepository.findById(2).orElseThrow(() -> new RuntimeException("Không tìm thấy role")));
        user.setRoles(roles);
        var savedUser = userRepository.save(user);
        var cart = new Cart();
        cart.setUser(savedUser);
        cartRepository.save(cart);
        savedUser.setCart(cart);
        return userRepository.save(savedUser);
    }


    @Override
    public List<User> findAllUser() {
        return userRepository.findAll();
    }

    @Override
    public void addUser(User user) {
        userRepository.save(user);
    }

    @Override
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> updateUser(User user) {
        var currentReview = userRepository.findById(user.getId());
        if (currentReview.isPresent()) {
            user.getUserDetail().setUserId(currentReview.get().getUserDetail().getUserId());
            userRepository.save(user);
            return Optional.of(user);
        }
        return Optional.empty();
    }

    @Override
    public Optional<User> deleteUserById(Long id) {
        var data = userRepository.findById(id);
        data.ifPresent(userRepository::delete);
        return data;
    }

    @Override
    public Long countUserByRole(String role) {
        return userRepository.countUserByRole(role);
    }
}
