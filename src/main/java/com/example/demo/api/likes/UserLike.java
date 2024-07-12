package com.example.demo.api.likes;

import com.example.demo.api.user.User;
import com.example.demo.models.Likeable;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JoinColumn(name = "likeable_id", referencedColumnName = "id")
    @JsonIgnore
    private Likeable likeable;
    
    @ManyToOne
    @JoinColumn(name = "author")
    @JsonIgnore
    private User author;
    @CreationTimestamp
    private Date createdAt;
    @NotNull
    private LikableItemType itemType;
}
