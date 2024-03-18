package com.example.demo.api.auth;

import com.example.demo.config.JwtService;
import com.example.demo.api.auth.user.Role;
import com.example.demo.api.auth.user.User;
import com.example.demo.api.auth.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                       .firstname(request.getFirstname())
                       .lastname(request.getLastname())
                       .username(request.getUsername())
                       .email(request.getEmail())
                       .password(passwordEncoder.encode(request.getPassword()))
                       .role(Role.USER)
                       .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                                     .token(jwtToken)
                                     .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()));
        var user = repository.findByEmail(request.getEmail())
                             .orElseThrow();
        var savedUser = repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                                     .token(jwtToken)
                                     .build();
    }

}
