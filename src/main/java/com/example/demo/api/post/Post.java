package com.example.demo.api.post;

import com.example.demo.api.auth.user.User;
import com.example.demo.api.comment.Comment;
import com.example.demo.models.Likeable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;


@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Data
@Entity
@Table
@Builder
@AllArgsConstructor
public class Post extends Likeable {
    @Id
    @GeneratedValue
    private Long id;
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    @ManyToOne
    @JoinColumn(name = "author")
    @JsonIgnore // Exclude author from JSON response
    private User author;
    private String[] images;

    @OneToMany(mappedBy = "post")
    @JsonIgnore // Exclude Comments from JSON response
    private List<Comment> comments;

}
