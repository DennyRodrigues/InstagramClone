package com.example.demo.api.comment;

import com.example.demo.api.auth.user.User;
import com.example.demo.api.post.Post;
import com.example.demo.models.Likeable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@Data
@Entity
@Table
@Builder
@AllArgsConstructor
public class Comment extends Likeable {
    private String description;
    @ManyToOne
    @JoinColumn(name = "author")
    @JsonIgnore // Exclude author from JSON response
    private User author;
    @ManyToOne
    @JoinColumn(name = "post_id")
    @JsonIgnore // Exclude Post from JSON response
    private Post post;
}
