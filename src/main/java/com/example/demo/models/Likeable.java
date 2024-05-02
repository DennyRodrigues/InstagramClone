package com.example.demo.models;

import com.example.demo.api.likes.UserLike;
import jakarta.persistence.*;

import java.util.List;

@Entity
public abstract class Likeable {
    @Id
    @GeneratedValue
    private Long id;
    @OneToMany(mappedBy = "likeable")
    List<UserLike> userLikes;

    public int getUserLikesSize() {
        return userLikes != null ? userLikes.size() : 0;
    }

}
