package com.example.venue.controller;

import com.example.venue.dto.VenueDTO;
import com.example.venue.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/venues")
public class VenueController {
    
    @Autowired
    private VenueService venueService;
    
    @GetMapping
    public List<VenueDTO> getAllVenues() {
        return venueService.getAllVenues();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<VenueDTO> getVenueById(@PathVariable Long id) {
        VenueDTO venue = venueService.getVenueById(id);
        return venue != null ? ResponseEntity.ok(venue) : ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public VenueDTO createVenue(@RequestBody VenueDTO venueDTO) {
        return venueService.createVenue(venueDTO);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<VenueDTO> updateVenue(@PathVariable Long id, @RequestBody VenueDTO venueDTO) {
        VenueDTO updatedVenue = venueService.updateVenue(id, venueDTO);
        return updatedVenue != null ? ResponseEntity.ok(updatedVenue) : ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVenue(@PathVariable Long id) {
        venueService.deleteVenue(id);
        return ResponseEntity.ok().build();
    }
} 