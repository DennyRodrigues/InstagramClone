package com.example.demo.api.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.util.ArrayList;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    public Integer id;
    public String username;
    public String bio;
    public ArrayList<String> followers;
    public ArrayList<String> following;
}
