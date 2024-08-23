package com.example.demo.api.auth;

import com.example.demo.api.user.CustomUserDetails;
import com.example.demo.config.JwtService;
import com.example.demo.api.user.Role;
import com.example.demo.api.user.User;
import com.example.demo.api.user.UserRepository;
import com.example.demo.utils.exception.ApiRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
            throw new ApiRequestException("email already taken", HttpStatus.BAD_REQUEST);
        }
        var user = User.builder()
                       .firstname(request.getFirstname())
                       .lastname(request.getLastname())
                       .email(request.getEmail()
                                     .toLowerCase())
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
        try {

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()));
            var user = userRepository.findByEmail(request.getEmail()
                                                         .toLowerCase())
                                     .orElseThrow();
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                                         .token(jwtToken)
                                         .build();
        } catch (Exception ex) {
            throw new ApiRequestException("Bad Credentials",
                                          HttpStatus.UNAUTHORIZED);
        }
    }

    public User getCurrentUser() {
        CustomUserDetails user = (CustomUserDetails) SecurityContextHolder.getContext()
                                                                          .getAuthentication()
                                                                          .getPrincipal();
        Integer userId = user.getId();
        return userRepository.findById(user.getId())
                             .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found"));
    }
}
