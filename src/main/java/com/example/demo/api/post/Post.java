package com.example.demo.api.post;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@NoArgsConstructor
@Data
@Entity
@Table
@Builder
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String description;
    private Long author;
    private Long[] images;
    private Integer likes;
    private Date createdAt;
    private Date updateAt;

}
