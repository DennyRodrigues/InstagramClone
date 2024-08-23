package com.example.demo.api.post;

import com.example.demo.api.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {
    @Query("SELECT p FROM Post p WHERE p.author = ?1")
    public Optional<List<Post>> getPostsByUser(User userId);

    @Query("SELECT DISTINCT p FROM Post p JOIN FETCH p.userLikes ul WHERE ul.author.id IN ?1")
    public Optional<List<Post>> getPostsAndLikesByListOfUser(List<Integer> users);


    // Method to get all post with likes from following list from the user
    @Query(value = "SELECT " +
            "    p.id, " +
            "    p.author, " +
            "    u.custom_username AS author_username, " +
            "    u.profile_photo AS author_profile_photo, " +
            "    p.images, " +
            "    p.description, " +
            "    p.created_at, " +
            "    p.updated_at, " +
            "    (SELECT COUNT(*) FROM user_like ul_all WHERE ul_all.likeable_id = p.id) AS likes_count, " +
            "    JSON_AGG(" +
            "        JSON_BUILD_OBJECT(" +
            "            'like_id', ul.id, " +
            "            'author_id', ul.author" +
            "        )" +
            "    ) AS likes " +
            "FROM " +
            "    post p " +
            "JOIN _user u ON p.author = u.id " +
            "LEFT JOIN (" +
            "    SELECT DISTINCT " +
            "        ul.id, " +
            "        ul.likeable_id, " +
            "        ul.author, " +
            "        ul.created_at " +
            "    FROM " +
            "        user_like ul " +
            "    JOIN _user u2 ON ul.author = u2.id " +
            "    WHERE " +
            "        u2.id IN (:followerIds)" +
            ") AS ul ON p.id = ul.likeable_id " +
            "GROUP BY " +
            "    p.id, p.description, p.images, p.created_at, p.updated_at, u.custom_username, u.profile_photo " +
            "ORDER BY p.created_at DESC",  // Add this line to order by created_at
            nativeQuery = true)
    List<Object[]> getPostsWithLikesByFollowingList(@Param("followerIds") List<Integer> followerIds);

    // Method to get posts that have NOT been viewed by the current user
    @Query(value = "SELECT " +
            "    p.id, " +
            "    p.author, " +
            "    u.custom_username AS author_username, " +
            "    u.profile_photo AS author_profile_photo, " +
            "    p.images, " +
            "    p.description, " +
            "    p.created_at, " +
            "    p.updated_at, " +
            "    (SELECT COUNT(*) FROM user_like ul_all WHERE ul_all.likeable_id = p.id) AS likes_count, " +
            "    JSON_AGG(" +
            "        JSON_BUILD_OBJECT(" +
            "            'like_id', ul.id, " +
            "            'author_id', ul.author" +
            "        )" +
            "    ) AS likes " +
            "FROM " +
            "    post p " +
            "JOIN _user u ON p.author = u.id " +
            "LEFT JOIN (" +
            "    SELECT DISTINCT " +
            "        ul.id, " +
            "        ul.likeable_id, " +
            "        ul.author, " +
            "        ul.created_at " +
            "    FROM " +
            "        user_like ul " +
            "    JOIN _user u2 ON ul.author = u2.id " +
            "    WHERE " +
            "        u2.id IN (:followerIds)" +
            ") AS ul ON p.id = ul.likeable_id " +
            "WHERE NOT EXISTS ( " +
            "    SELECT 1 " +
            "    FROM item_viewed iv " +
            "    WHERE iv.likeable = p.id " +
            "    AND iv.author = :userId " +
            ") " +
            "GROUP BY " +
            "    p.id, p.description, p.images, p.created_at, p.updated_at, u.custom_username, u.profile_photo " +
            "ORDER BY p.created_at DESC",
            nativeQuery = true)
    List<Object[]> getPostsWithLikesByFollowingListNotViewed(@Param("followerIds") List<Integer> followerIds,
                                                             @Param("userId") Integer userId);
}
