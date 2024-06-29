package com.example.demo.api.auth;

import com.example.demo.api.auth.user.CustomUserDetails;
import com.example.demo.config.JwtService;
import com.example.demo.api.auth.user.Role;
import com.example.demo.api.auth.user.User;
import com.example.demo.api.auth.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {


        var userExists = userRepository.findByEmail(request.getEmail())
                                       .isPresent();
        if (userExists) {
            throw new RuntimeException(new Exception("email already taken"));
        }
        var user = User.builder()
                       .firstname(request.getFirstname())
                       .lastname(request.getLastname())
                       .email(request.getEmail())
                       .password(passwordEncoder.encode(request.getPassword()))
                       .role(Role.USER)
                       .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                                     .token(jwtToken)
                                     .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail())
                                 .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                                     .token(jwtToken)
                                     .build();
    }

    public User returnUser() {
        CustomUserDetails user = (CustomUserDetails) SecurityContextHolder.getContext()
                                                                          .getAuthentication()
                                                                          .getPrincipal();
        Integer userId = user.getId();
        return userRepository.findById(user.getId())
                             .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found"));
    }
}
