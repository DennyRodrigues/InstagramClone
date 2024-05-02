package com.example.demo.models;

import com.example.demo.api.likes.UserLike;
import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.List;

@Entity
public abstract class Likeable {
    @Getter
    @Id
    @GeneratedValue
    Long id;
    @OneToMany(mappedBy = "likeable")
    List<UserLike> userLikes;

    @Getter
    @CreationTimestamp
    Date CreatedAt;
    @Getter
    @UpdateTimestamp
    Date UpdatedAt;

    public int getLikesCount() {
        return userLikes != null ? userLikes.size() : 0;
    }

}
