package com.example.college_server.service;

import com.example.college_server.entity.Story;
import com.example.college_server.repository.StoryRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Service class that handles business logic related to the {@link Story} entity.
 * Implements {@link StoryRepository} to interact with the database for CRUD operations.
 */
@Service
public class StoryService implements StoryRepository {

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Saves a {@link Story} to the database. If the story has an ID, it will be merged (updated),
     * otherwise it will be persisted (inserted).
     *
     * @param story the {@link Story} entity to be saved.
     * @return the saved {@link Story} entity.
     */
    @Transactional
    @Override
    public Story save(Story story) {
        if (story.getId() == null) {
            entityManager.persist(story);
        } else {
            entityManager.merge(story);
        }
        return story;
    }

    /**
     * Finds a {@link Story} by its ID.
     *
     * @param id the ID of the {@link Story} to be retrieved.
     * @return an {@link Optional} containing the {@link Story} if found, otherwise an empty {@link Optional}.
     */
    @Override
    public Optional<Story> findById(Long id) {
        return Optional.ofNullable(entityManager.find(Story.class, id));
    }

    /**
     * Checks whether a {@link Story} exists by its ID.
     *
     * @param id the ID of the {@link Story} to be checked.
     * @return true if the {@link Story} exists, otherwise false.
     */
    @Override
    public boolean existsById(Long id) {
        String query = "SELECT COUNT(s) > 0 FROM Story s WHERE s.id = :id";
        Boolean exists = entityManager.createQuery(query, Boolean.class)
                .setParameter("id", id)
                .getSingleResult();
        return exists;
    }

    /**
     * Deletes a {@link Story} by its ID.
     *
     * @param id the ID of the {@link Story} to be deleted.
     */
    @Transactional
    @Override
    public void deleteById(Long id) {
        Story story = entityManager.find(Story.class, id);
        if (story != null) {
            entityManager.remove(story);
        }
    }

    /**
     * Finds all active {@link Story} entities that have not expired and are not marked as deleted.
     *
     * @param currentTime the current time to check if the story has expired.
     * @return a list of active {@link Story} entities.
     */
    @Override
    public List<Story> findAllActiveStories(LocalDateTime currentTime) {
        String query = "SELECT s FROM Story s WHERE s.expiresAt > :currentTime AND s.deleted = false";
        TypedQuery<Story> typedQuery = entityManager.createQuery(query, Story.class);
        typedQuery.setParameter("currentTime", currentTime);
        return typedQuery.getResultList();
    }

    /**
     * Finds all active {@link Story} entities by a specific user's ID that have not expired
     * and are not marked as deleted.
     *
     * @param userId the ID of the user whose active stories are to be retrieved.
     * @param currentTime the current time to check if the story has expired.
     * @return a list of active {@link Story} entities for the specified user.
     */
    @Override
    public List<Story> findActiveStoriesByUserId(Long userId, LocalDateTime currentTime) {
        String query = "SELECT s FROM Story s WHERE s.user.id = :userId AND s.expiresAt > :currentTime AND s.deleted = false";
        TypedQuery<Story> typedQuery = entityManager.createQuery(query, Story.class);
        typedQuery.setParameter("userId", userId);
        typedQuery.setParameter("currentTime", currentTime);
        return typedQuery.getResultList();
    }

    /**
     * Marks all expired stories (those whose expiration date is before or equal to the current time)
     * as deleted (soft delete).
     *
     * @param currentTime the current time to check for expired stories.
     */
    @Transactional
    @Override
    public void markExpiredStoriesAsDeleted(LocalDateTime currentTime) {
        String query = "UPDATE Story s SET s.deleted = true WHERE s.expiresAt <= :currentTime AND s.deleted = false";
        entityManager.createQuery(query)
                .setParameter("currentTime", currentTime)
                .executeUpdate();
    }

    /**
     * Deletes all expired stories (those whose expiration date is before or equal to the current time).
     *
     * @param currentTime the current time to check for expired stories.
     */
    @Transactional
    @Override
    public void deleteExpiredStories(LocalDateTime currentTime) {
        String query = "DELETE FROM Story s WHERE s.expiresAt <= :currentTime";
        entityManager.createQuery(query)
                .setParameter("currentTime", currentTime)
                .executeUpdate();
    }
}
