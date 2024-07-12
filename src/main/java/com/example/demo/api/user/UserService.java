package com.example.demo.api.user;

import com.example.demo.api.followers.FollowRelationshipService;
import com.example.demo.utils.exception.ApiRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final FollowRelationshipService followRelationshipService;

    public User getUserByUsername(String username) {

        return userRepository.findByUsername(username)
                             .orElseThrow(() -> new ApiRequestException("User with username " + username + " not found"));
    }

    public UserResponse getUserByUsernameWithFollowers(String username) {

        User user = userRepository.findByUsername(username)
                                  .orElseThrow(() -> new ApiRequestException("User with username " + username + " not found"));


        ArrayList<String> followers = followRelationshipService.getUsernameFollowersList(user);
        ArrayList<String> following = followRelationshipService.getUsernameFollowingList(user);
        UserResponse response = new UserResponse();
        response.setUsername(user.getUsername());
        response.setFollowers(followers);
        response.setFollowing(following);
        return response;
    }
}
