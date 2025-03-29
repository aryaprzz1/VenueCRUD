package com.example.venue.service;

import com.example.venue.dto.BookingDTO;
import com.example.venue.entity.Booking;
import com.example.venue.entity.Venue;
import com.example.venue.repository.BookingRepository;
import com.example.venue.repository.VenueRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private VenueRepository venueRepository;
    
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public BookingDTO getBookingById(Long id) {
        return bookingRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }
    
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        Venue venue = venueRepository.findById(bookingDTO.getVenueId())
                .orElseThrow(() -> new RuntimeException("Venue not found"));
        
        Booking booking = convertToEntity(bookingDTO);
        booking.setVenue(venue);
        return convertToDTO(bookingRepository.save(booking));
    }
    
    public BookingDTO updateBooking(Long id, BookingDTO bookingDTO) {
        if (bookingRepository.existsById(id)) {
            Venue venue = venueRepository.findById(bookingDTO.getVenueId())
                    .orElseThrow(() -> new RuntimeException("Venue not found"));
            
            Booking booking = convertToEntity(bookingDTO);
            booking.setBookingId(id);
            booking.setVenue(venue);
            return convertToDTO(bookingRepository.save(booking));
        }
        return null;
    }
    
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
    
    public List<BookingDTO> getBookingsByVenueAndDate(Long venueId, LocalDate date) {
        return bookingRepository.findByVenue_VenueIdAndDate(venueId, date).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    private BookingDTO convertToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        BeanUtils.copyProperties(booking, dto);
        dto.setVenueId(booking.getVenue().getVenueId());
        return dto;
    }
    
    private Booking convertToEntity(BookingDTO dto) {
        Booking booking = new Booking();
        BeanUtils.copyProperties(dto, booking);
        return booking;
    }
} 