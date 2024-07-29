package com.example.demo.api.user;


import com.example.demo.api.post.Post;
import com.example.demo.api.post.PostRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping(path = "/{username}")
    public UserResponse getUserByUsername(@PathVariable("username") String username) {
        return userService.getUserByUsernameWithFollowers(username);
    }

    @PostMapping(path = "/notificationToken")
    public User saveNotificationToken(@RequestBody String token) {
        return userService.saveNotificationToken(token);
    }
}

