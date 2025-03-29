import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VenueService } from '../../services/venue.service';
import { BookingService } from '../../services/booking.service';
import { Venue } from '../../models/venue.model';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-venue-booking',
  templateUrl: './venue-booking.component.html',
  styleUrls: ['./venue-booking.component.css']
})
export class VenueBookingComponent implements OnInit {
  venues: Venue[] = [];
  bookingForm: FormGroup;
  bookings: Booking[] = [];

  constructor(
    private fb: FormBuilder,
    private venueService: VenueService,
    private bookingService: BookingService
  ) {
    this.bookingForm = this.fb.group({
      venueId: ['', Validators.required],
      activityId: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadVenues();
    this.loadBookings();
  }

  loadVenues(): void {
    this.venueService.getAllVenues()
      .subscribe(venues => {
        this.venues = venues;
      });
  }

  loadBookings(): void {
    this.bookingService.getAllBookings()
      .subscribe(bookings => {
        this.bookings = bookings;
      });
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const booking: Booking = this.bookingForm.value;
      this.bookingService.createBooking(booking)
        .subscribe(() => {
          this.loadBookings();
          this.bookingForm.reset();
        });
    }
  }

  onVenueChange(venueId: number): void {
    const date = this.bookingForm.get('date')?.value;
    if (date) {
      this.bookingService.getBookingsByVenueAndDate(venueId, date)
        .subscribe(bookings => {
          this.bookings = bookings;
        });
    }
  }

  onDateChange(): void {
    const venueId = this.bookingForm.get('venueId')?.value;
    const date = this.bookingForm.get('date')?.value;
    if (venueId && date) {
      this.bookingService.getBookingsByVenueAndDate(venueId, date)
        .subscribe(bookings => {
          this.bookings = bookings;
        });
    }
  }
} 