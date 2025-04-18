import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VenueService } from '../../services/venue.service';
import { Venue } from '../../models/venue.model';
import { VenueFormDialogComponent } from '../venue-form-dialog/venue-form-dialog.component';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-venue-display',
  templateUrl: './venue-display.component.html',
  styleUrls: ['./venue-display.component.css']
})
export class VenueDisplayComponent implements OnInit {
  venues: Venue[] = [];
  displayedColumns: string[] = ['venueId', 'name', 'location', 'capacity', 'actions'];
  isLoading = false;

  constructor(
    private venueService: VenueService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadVenues();
  }

  loadVenues(): void {
    this.isLoading = true;
    this.venueService.getAllVenues()
      .pipe(
        catchError(error => {
          this.showError('Failed to load venues');
          return of([]);
        })
      )
      .subscribe(venues => {
        this.venues = venues.sort((a, b) => a.venueId - b.venueId);
        this.isLoading = false;
      });
  }

  openVenueDialog(venue?: Venue): void {
    const dialogRef = this.dialog.open(VenueFormDialogComponent, {
      width: '400px',
      data: venue || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.venueId) {
          this.updateVenue(result);
        } else {
          this.createVenue(result);
        }
      }
    });
  }

  createVenue(venue: Venue): void {
    this.venueService.createVenue(venue)
      .pipe(
        catchError(error => {
          this.showError('Failed to create venue');
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.showSuccess('Venue created successfully');
          this.loadVenues();
        }
      });
  }

  updateVenue(venue: Venue): void {
    this.venueService.updateVenue(venue.venueId!, venue)
      .pipe(
        catchError(error => {
          this.showError('Failed to update venue');
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.showSuccess('Venue updated successfully');
          this.loadVenues();
        }
      });
  }

  deleteVenue(id: number): void {
    if (confirm('Are you sure you want to delete this venue?')) {
      this.venueService.deleteVenue(id)
        .pipe(
          catchError(error => {
            this.showError('Failed to delete venue');
            return of(null);
          })
        )
        .subscribe(() => {
          this.showSuccess('Venue deleted successfully');
          this.loadVenues();
        });
    }
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
} 