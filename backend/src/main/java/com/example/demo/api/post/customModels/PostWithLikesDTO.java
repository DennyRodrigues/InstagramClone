package com.example.demo.api.post.customModels;

import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class PostWithLikesDTO {
    private Long id;
    private Long author;
    private String authorUsername;
    private String profilePhoto;
    private String description;
    private ArrayList<String> images;
    private Date createdAt;
    private Date updatedAt;
    private Number likesCount;
    private List<LikeDTO> likes;
}
