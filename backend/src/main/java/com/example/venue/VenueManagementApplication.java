package com.example.venue;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.example.venue.entity")
@EnableJpaRepositories("com.example.venue.repository")
public class VenueManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(VenueManagementApplication.class, args);
    }
} 