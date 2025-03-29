package com.example.venue.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class BookingDTO {
    private Long bookingId;
    private Long venueId;
    private String activityId;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
} 