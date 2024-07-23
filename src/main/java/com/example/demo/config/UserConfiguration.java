package com.example.demo.config;

import com.example.demo.api.followers.FollowRelationship;
import com.example.demo.api.followers.FollowRelationshipRepo;
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
                                            UserLikeRepo userLikeRepo,
                                            FollowRelationshipRepo followRelationshipRepo) {
        return args -> {
            var david = User.builder()
                            .firstname("david")
                            .lastname("joao")
                            .username("david_joao")
                            .email("david@gmail.com")
                            .bio("GYM RAT!!")
                            .password(passwordEncoder.encode("123"))
                            .role(Role.USER)
                            .build();
            var lucas = User.builder()
                            .firstname("lucas")
                            .lastname("joao")
                            .username("lucas_joao")
                            .email("lucas@gmail.com")
                            .bio("Software Engineer, dancer and cosplay ")
                            .password(passwordEncoder.encode("1234"))
                            .role(Role.USER)
                            .build();
            var matheus = User.builder()
                              .firstname("matheus")
                              .lastname("ducard")
                              .username("matheus_joao")
                              .bio("Not a Robot")
                              .email("matheus@gmail.com")
                              .password(passwordEncoder.encode("12345"))
                              .role(Role.USER)
                              .build();
            userRepository.saveAll(
                    List.of(david, lucas, matheus)
            );
            ArrayList<String> post1Images = new ArrayList<String>();
            post1Images.add("upload/images/MockImage.png");
            Post post1 = Post.builder()
                             .author(lucas)
                             .description("White and big")
                             .images(post1Images)
                             .build();
            Post post2 = Post.builder()
                             .author(matheus)
                             .description("A new world")
                             .images(post1Images)
                             .build();
            postRepo.saveAll(List.of(post1, post2));
            Comment comment = Comment.builder()
                                     .author(david)
                                     .post(post1)
                                     .description("I love the moon!!")
                                     .build();

            commentRepo.saveAll(List.of(comment));
            UserLike userLike1 = UserLike.builder()
                                         .author(david)
                                         .itemType(LikableItemType.POST)
                                         .likeable(post1)
                                         .build();
            UserLike userLike2 = UserLike.builder()
                                         .author(lucas)
                                         .itemType(LikableItemType.POST)
                                         .likeable(post1)
                                         .build();
            UserLike userLike3 = UserLike.builder()
                                         .author(david)
                                         .itemType(LikableItemType.COMMENT)
                                         .likeable(comment)
                                         .build();
            UserLike userLike4 = UserLike.builder()
                                         .author(matheus)
                                         .itemType(LikableItemType.COMMENT)
                                         .likeable(post1)
                                         .build();
            UserLike userLike5 = UserLike.builder()
                                         .author(matheus)
                                         .itemType(LikableItemType.COMMENT)
                                         .likeable(post2)
                                         .build();
            userLikeRepo.saveAll(List.of(userLike1, userLike2, userLike3, userLike4, userLike5));

            FollowRelationship followingRelationship1 = FollowRelationship.builder()
                                                                          .follower(lucas)
                                                                          .following(david)
                                                                          .build();
            FollowRelationship followingRelationship2 = FollowRelationship.builder()
                                                                          .follower(david)
                                                                          .following(lucas)
                                                                          .build();
            FollowRelationship followingRelationship3 = FollowRelationship.builder()
                                                                          .follower(david)
                                                                          .following(matheus)
                                                                          .build();
            FollowRelationship followingRelationship4 = FollowRelationship.builder()
                                                                          .follower(lucas)
                                                                          .following(matheus)
                                                                          .build();
            followRelationshipRepo.saveAll(
                    List.of(followingRelationship1,
                            followingRelationship2,
                            followingRelationship3,
                            followingRelationship4)
            );


        };
    }
}
