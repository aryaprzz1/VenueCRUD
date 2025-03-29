package com.example.venue.repository;

import com.example.venue.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByVenue_VenueIdAndDate(Long venueId, LocalDate date);
} 