package com.example.demo.api.user;

import com.example.demo.api.auth.AuthenticationService;
import com.example.demo.api.followers.FollowRelationshipService;
import com.example.demo.api.user.projections.NotificationTokenProjection;
import com.example.demo.utils.exception.ApiRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final FollowRelationshipService followRelationshipService;
    private final AuthenticationService authenticationService;

    public User getUserByUsername(String username) {

        return userRepository.findByCustomUsername(username)
                             .orElseThrow(() -> new ApiRequestException("User with username " + username + " not found"));
    }

    public UserResponse getUserByUsernameWithFollowers(String username) {

        User user = userRepository.findByCustomUsername(username)
                                  .orElseThrow(() -> new ApiRequestException("User with username " + username + " not found"));


        ArrayList<String> followers = followRelationshipService.getUsernameFollowersList(user);
        ArrayList<String> following = followRelationshipService.getUsernameFollowingList(user);
        UserResponse response = new UserResponse();
        response.setUsername(user.getCustomUsername());
        response.setId(user.getId());
        response.setBio(user.getBio());
        response.setFollowers(followers);
        response.setFollowing(following);
        return response;
    }

    public User saveNotificationToken(String token) {
        User user = authenticationService.getCurrentUser();
        user.setNotificationToken(token);
        return userRepository.save(user);
    }

    public List<NotificationTokenProjection> getListOfNotificationToken(List<Integer> userIds) {
        return userRepository.findByIdIn(userIds);
    }
}
