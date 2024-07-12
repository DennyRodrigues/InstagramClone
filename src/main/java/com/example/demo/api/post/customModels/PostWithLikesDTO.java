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
    private String description;
    private ArrayList<String> images;
    private Date createdAt;
    private Date updatedAt;
    private List<LikeDTO> likes;
}
