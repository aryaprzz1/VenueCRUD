package com.example.venue.dto;

import lombok.Data;

@Data
public class VenueDTO {
    private Long venueId;
    private String name;
    private String location;
    private Integer capacity;
} 