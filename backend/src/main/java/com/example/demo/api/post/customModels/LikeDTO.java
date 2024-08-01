package com.example.demo.api.post.customModels;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.Timestamp;
import java.time.LocalDateTime;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class LikeDTO {
    private Long likeId;
    private Long authorId;
}
