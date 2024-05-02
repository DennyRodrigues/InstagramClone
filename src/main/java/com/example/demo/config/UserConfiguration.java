package com.example.demo.config;

import com.example.demo.api.auth.user.Role;
import com.example.demo.api.auth.user.User;
import com.example.demo.api.auth.user.UserRepository;
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
                            .lastname("david_joao")
                            .email("david@gmail.com")
                            .password(passwordEncoder.encode("123"))
                            .role(Role.USER)
                            .build();
            String[] post1Images = new String[]{("img1")};
            Post post1 = Post.builder()
                             .author(david)
                             .title("Beautiful Moon")
                             .description("White and big")
                             .images(post1Images)
                             .build();
            Post post2 = Post.builder()
                             .author(david)
                             .title("Fearful Sun")
                             .description("A new world")
                             .images(post1Images)
                             .build();

            Comment comment = Comment.builder()
                                     .author(david)
                                     .post(post1)
                                     .description("I love the moon!!")
                                     .build();
            UserLike userLike = UserLike.builder()
                                        .author(david)
                                        .item_type(LikableItemType.POST)
                                        .likeable(post1)
                                        .build();

            userRepository.saveAll(
                    List.of(david)
            );
            postRepo.saveAll(List.of(post1, post2));
            commentRepo.saveAll(List.of(comment));
            System.out.println(userLike);
            userLikeRepo.saveAll(List.of(userLike));
        };
    }
}
