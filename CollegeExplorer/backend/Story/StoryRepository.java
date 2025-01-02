package com.example.college_server.repository;

import com.example.college_server.entity.Story;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface StoryRepository {
    Story save(Story story);

    Optional<Story> findById(Long id);

    boolean existsById(Long id);

    void deleteById(Long id);

    List<Story> findAllActiveStories(LocalDateTime currentTime);

    List<Story> findActiveStoriesByUserId(Long userId, LocalDateTime currentTime);

    void markExpiredStoriesAsDeleted(LocalDateTime currentTime);

    void deleteExpiredStories(LocalDateTime currentTime);
}
