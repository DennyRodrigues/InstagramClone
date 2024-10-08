package com.example.demo.api.followers;

import com.example.demo.api.auth.AuthenticationService;
import com.example.demo.api.user.User;
import com.example.demo.api.user.UserRepository;
import com.example.demo.utils.exception.ApiRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class FollowRelationshipService {


    private final FollowRelationshipRepo followRelationshipRepo;
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    public ArrayList<String> getUsernameFollowingList(User user) {
        return followRelationshipRepo.findFollowingUsernamesByFollower(user);
    }

    public ArrayList<String> getUsernameFollowersList(User user) {
        return followRelationshipRepo.findFollowerUsernamesByFollowing(user);
    }

    public ArrayList<Integer> getFollowingList(User user) {
        return followRelationshipRepo.findFollowingIdByFollower(user);
    }

    public ArrayList<Integer> getFollowersList(User user) {
        return followRelationshipRepo.findFollowingIdByFollowing(user);
    }


    public boolean addFollow(Integer id) {
        Optional<User> following = userRepository.findById(id);
        if (following.isEmpty()) {
            throw new ApiRequestException("Trying to follow a user that doesn't exist", HttpStatus.BAD_REQUEST);
        }
        FollowRelationship followRelationship = new FollowRelationship();
        followRelationship.setFollower(authenticationService.getCurrentUser());
        followRelationship.setFollowing(following.get());
        followRelationshipRepo.save(followRelationship);
        return true;
    }
}
