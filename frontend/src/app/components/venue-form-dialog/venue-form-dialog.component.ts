import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Venue } from '../../models/venue.model';

@Component({
  selector: 'app-venue-form-dialog',
  template: `
    <h2 mat-dialog-title>{{data.venueId ? 'Edit' : 'Add'}} Venue</h2>
    <form [formGroup]="venueForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <mat-form-field appearance="fill">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" required>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Location</mat-label>
          <input matInput formControlName="location" required>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Capacity</mat-label>
          <input matInput type="number" formControlName="capacity" required>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button type="button" (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="!venueForm.valid">
          {{data.venueId ? 'Update' : 'Create'}}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }
  `]
})
export class VenueFormDialogComponent {
  venueForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VenueFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Venue
  ) {
    this.venueForm = this.fb.group({
      name: [data.name || '', Validators.required],
      location: [data.location || '', Validators.required],
      capacity: [data.capacity || '', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.venueForm.valid) {
      const venue = {
        ...this.data,
        ...this.venueForm.value
      };
      this.dialogRef.close(venue);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 