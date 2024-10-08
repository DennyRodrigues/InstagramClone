package com.example.demo.api.post;

import com.example.demo.api.post.customModels.PostWithLikesDTO;
import com.example.demo.api.user.User;
import com.example.demo.api.comment.Comment;
import com.example.demo.models.Likeable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Data
@Entity
@Table(name = "post")
@Builder
@AllArgsConstructor
public class Post extends Likeable {

    private String description = "";
    @ManyToOne
    @JoinColumn(name = "author")
    @JsonIgnore // Exclude author from JSON response
    private User author;
    private ArrayList<String> images;

    @OneToMany(mappedBy = "post")
    @JsonIgnore // Exclude Comments from JSON response
    private List<Comment> comments;

}
