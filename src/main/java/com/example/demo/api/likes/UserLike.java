package com.example.demo.api.likes;

import com.example.demo.api.auth.user.User;
import com.example.demo.models.Likeable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table
public class UserLike {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    @JoinColumn(name = "likable_id")
    private Likeable likeable;
    @ManyToOne
    @JoinColumn(name = "author")
    private User author;
    @CreationTimestamp
    private Date createdAt;
    @NotNull
    private LikableItemType item_type;
}
