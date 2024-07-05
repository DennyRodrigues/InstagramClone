package com.example.demo.api.followers;

import com.example.demo.api.auth.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface FollowRelationshipRepo extends JpaRepository<FollowRelationship, Long> {
    @Query("SELECT u.username FROM FollowRelationship fr JOIN fr.following u WHERE fr.follower = :user")
    ArrayList<String> findFollowingUsernamesByFollower(@Param("user") User user);

    @Query("SELECT u.username FROM FollowRelationship fr JOIN fr.follower u WHERE fr.following = :user")
    ArrayList<String> findFollowerUsernamesByFollowing(@Param("user") User user);
}
