package com.example.venue.service;

import com.example.venue.dto.VenueDTO;
import com.example.venue.entity.Venue;
import com.example.venue.repository.VenueRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VenueService {
    
    @Autowired
    private VenueRepository venueRepository;
    
    public List<VenueDTO> getAllVenues() {
        return venueRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public VenueDTO getVenueById(Long id) {
        return venueRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }
    
    public VenueDTO createVenue(VenueDTO venueDTO) {
        Venue venue = convertToEntity(venueDTO);
        return convertToDTO(venueRepository.save(venue));
    }
    
    public VenueDTO updateVenue(Long id, VenueDTO venueDTO) {
        if (venueRepository.existsById(id)) {
            Venue venue = convertToEntity(venueDTO);
            venue.setVenueId(id);
            return convertToDTO(venueRepository.save(venue));
        }
        return null;
    }
    
    public void deleteVenue(Long id) {
        venueRepository.deleteById(id);
    }
    
    private VenueDTO convertToDTO(Venue venue) {
        VenueDTO dto = new VenueDTO();
        BeanUtils.copyProperties(venue, dto);
        return dto;
    }
    
    private Venue convertToEntity(VenueDTO dto) {
        Venue venue = new Venue();
        BeanUtils.copyProperties(dto, venue);
        return venue;
    }
} 