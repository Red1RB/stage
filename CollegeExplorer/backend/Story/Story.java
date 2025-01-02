package com.example.college_server.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = true)
    private String imageUrl;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    @Column(nullable = false)
    private boolean deleted = false;

    @PrePersist
    public void prePersist() {
        // If createdAt is not set, set it to the current time
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }

        // Set expiresAt to 24 hours after createdAt
        if (expiresAt == null) {
            expiresAt = createdAt.plusHours(24);
        }
    }
}

