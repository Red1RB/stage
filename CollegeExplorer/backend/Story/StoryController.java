package com.example.college_server.controller;

import com.example.college_server.entity.Story;
import com.example.college_server.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stories")
public class StoryController {

    private final StoryService storyService;

    @Autowired
    public StoryController(StoryService storyService) {
        this.storyService = storyService;
    }

    /**
     * Create a new story.
     *
     * @param story The story to be created.
     * @return The created story.
     */
    @PostMapping
    public String createStory(@RequestBody Story story) {
        storyService.save(story);
        return "Story created successfully!";
    }

    /**
     * Get a story by its ID.
     *
     * @param id The ID of the story.
     * @return The requested story, if found.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Story> getStoryById(@PathVariable Long id) {
        Optional<Story> story = storyService.findById(id);
        return story.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    /**
     * Get all active stories.
     *
     * @return A list of active stories.
     */
    @GetMapping("/active")
    public ResponseEntity<List<Story>> getAllActiveStories() {
        List<Story> stories = storyService.findAllActiveStories(LocalDateTime.now());
        return ResponseEntity.ok(stories);
    }

    /**
     * Get all active stories by a specific user.
     *
     * @param userId The ID of the user.
     * @return A list of active stories by the user.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Story>> getActiveStoriesByUserId(@PathVariable Long userId) {
        List<Story> stories = storyService.findActiveStoriesByUserId(userId, LocalDateTime.now());
        return ResponseEntity.ok(stories);
    }

    /**
     * Delete a story by its ID.
     *
     * @param id The ID of the story to delete.
     * @return A response indicating the result.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStoryById(@PathVariable Long id) {
        if (storyService.existsById(id)) {
            storyService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /**
     * Mark expired stories as deleted.
     *
     * @return A response indicating the operation was successful.
     */
    @PatchMapping("/mark-expired")
    public ResponseEntity<Void> markExpiredStoriesAsDeleted() {
        storyService.markExpiredStoriesAsDeleted(LocalDateTime.now());
        return ResponseEntity.noContent().build();
    }

    /**
     * Permanently delete expired stories.
     *
     * @return A response indicating the operation was successful.
     */
    @DeleteMapping("/expired")
    public ResponseEntity<Void> deleteExpiredStories() {
        storyService.deleteExpiredStories(LocalDateTime.now());
        return ResponseEntity.noContent().build();
    }
}
