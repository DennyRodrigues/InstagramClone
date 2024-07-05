package com.example.demo.api.followers;

import com.example.demo.api.auth.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table
public class FollowRelationship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier for the follow relationship")
    private Long id;


    @ManyToOne
    @JoinColumn(name = "follower_id", nullable = false)
    @Schema(description = "The user being followed by another user")
    private User follower;
    
    @ManyToOne
    @JoinColumn(name = "following_id", nullable = false)
    @Schema(description = "The user being followed by another user")
    private User following;
}
