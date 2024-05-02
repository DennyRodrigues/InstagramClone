package com.example.demo.api.auth;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotNull(message = "Please provide a valid first name")
    private String firstname;
    @NotNull(message = "Please provide a valid last name")
    private String lastname;
    @NotNull(message = "Please provide a valid username")
    private String username;
    @NotNull(message = "Please provide a valid email")
    private String email;
    @NotNull(message = "Please provide a valid password")
    private String password;
}
