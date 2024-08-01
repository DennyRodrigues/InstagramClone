package com.example.demo.api.user;

import com.example.demo.api.user.projections.NotificationTokenProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> findByCustomUsername(String userId);

    List<NotificationTokenProjection> findByIdIn(List<Integer> userIds);
}
