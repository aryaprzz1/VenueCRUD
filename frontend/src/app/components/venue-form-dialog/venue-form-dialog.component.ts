import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Venue } from '../../models/venue.model';

@Component({
  selector: 'app-venue-form-dialog',
  template: `
    <div class="dialog-header">
      <h2 mat-dialog-title>{{data.venueId ? 'Edit' : 'Add'}} Venue</h2>
      <button mat-icon-button class="close-button" (click)="onCancel()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
    
    <form [formGroup]="venueForm" (ngSubmit)="onSubmit()" class="venue-form">
      <mat-dialog-content>
        <div class="form-content">
          <mat-form-field appearance="outline">
            <mat-label>Venue Name</mat-label>
            <input matInput formControlName="name" placeholder="Enter venue name" required>
            <mat-error *ngIf="venueForm.get('name')?.hasError('required')">
              Name is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Location</mat-label>
            <input matInput formControlName="location" placeholder="Enter venue location" required>
            <mat-error *ngIf="venueForm.get('location')?.hasError('required')">
              Location is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Capacity</mat-label>
            <input matInput type="number" formControlName="capacity" placeholder="Enter venue capacity" required>
            <mat-error *ngIf="venueForm.get('capacity')?.hasError('required')">
              Capacity is required
            </mat-error>
            <mat-error *ngIf="venueForm.get('capacity')?.hasError('min')">
              Capacity must be greater than 0
            </mat-error>
          </mat-form-field>
        </div>
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
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
    }

    .close-button {
      color: #6c757d;
    }

    .venue-form {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .form-content {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    mat-form-field {
      width: 100%;
    }

    mat-dialog-actions {
      padding: 16px 24px;
      border-top: 1px solid #e9ecef;
    }

    :host {
      display: block;
      max-width: 500px;
      width: 100%;
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