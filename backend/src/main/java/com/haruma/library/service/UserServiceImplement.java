package com.haruma.library.service;

import com.haruma.library.entity.Cart;
import com.haruma.library.entity.UserDetail;
import com.haruma.library.repository.CartRepository;
import com.haruma.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.haruma.library.entity.User;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplement implements UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    private final CartRepository cartRepository;

    @Autowired
    public UserServiceImplement(PasswordEncoder passwordEncoder, UserRepository userRepository, CartRepository cartRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
    }

    @Override
    public User registerUser(String email, String rawPassword, UserDetail userDetail) {
        var hashedPassword = passwordEncoder.encode(rawPassword);
        var user = new User();
        user.setEmail(email);
        user.setPassword(hashedPassword);
        user.setUserDetail(userDetail);
        userDetail.setUser(user);
        var savedUser = userRepository.save(user);
        var cart = new Cart();
        cart.setUser(savedUser);
        cartRepository.save(cart);
        savedUser.setCart(cart);
        return userRepository.save(savedUser);
    }

    @Override
    public User loginUser(String email, String rawPassword) {
        var hashedPassword = passwordEncoder.encode(rawPassword);
        var user = userRepository.findUserByEmail(email);
        if (hashedPassword.equals(user.getPassword())) {
            return user;
        }
        return null;
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
}
