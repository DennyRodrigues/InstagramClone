package com.example.demo.config;

import com.example.demo.api.user.Role;
import com.example.demo.api.user.User;
import com.example.demo.api.user.UserRepository;
import com.example.demo.api.comment.Comment;
import com.example.demo.api.comment.CommentRepo;
import com.example.demo.api.likes.LikableItemType;
import com.example.demo.api.likes.UserLike;
import com.example.demo.api.likes.UserLikeRepo;
import com.example.demo.api.post.Post;
import com.example.demo.api.post.PostRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class UserConfiguration {
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner commandLineRunnerUser(UserRepository userRepository,
                                            PostRepo postRepo,
                                            CommentRepo commentRepo,
                                            UserLikeRepo userLikeRepo) {
        return args -> {
            var david = User.builder()
                            .firstname("david")
                            .lastname("joao")
                            .username("david_joao")
                            .email("david@gmail.com")
                            .password(passwordEncoder.encode("123"))
                            .role(Role.USER)
                            .build();
            var lucas = User.builder()
                            .firstname("lucas")
                            .lastname("joao")
                            .username("lucas_joao")
                            .email("lucas@gmail.com")
                            .password(passwordEncoder.encode("1234"))
                            .role(Role.USER)
                            .build();
            ArrayList<String> post1Images = new ArrayList<String>();
            post1Images.add("upload/images/MockImage.png");
            Post post1 = Post.builder()
                             .author(david)
                             .description("White and big")
                             .images(post1Images)
                             .build();
            Post post2 = Post.builder()
                             .author(david)
                             .description("A new world")
                             .images(post1Images)
                             .build();

            Comment comment = Comment.builder()
                                     .author(david)
                                     .post(post1)
                                     .description("I love the moon!!")
                                     .build();
            UserLike userLike1 = UserLike.builder()
                                         .author(david)
                                         .itemType(LikableItemType.POST)
                                         .likeable(post1)
                                         .build();
            UserLike userLike3 = UserLike.builder()
                                         .author(david)
                                         .itemType(LikableItemType.COMMENT)
                                         .likeable(comment)
                                         .build();
            UserLike userLike2 = UserLike.builder()
                                         .author(lucas)
                                         .itemType(LikableItemType.POST)
                                         .likeable(post1)
                                         .build();

            userRepository.saveAll(
                    List.of(david, lucas)
            );
            postRepo.saveAll(List.of(post1, post2));
            commentRepo.saveAll(List.of(comment));
            userLikeRepo.saveAll(List.of(userLike1, userLike2, userLike3));
        };
    }
}
