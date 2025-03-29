import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VenueDisplayComponent } from './components/venue-display/venue-display.component';
import { VenueBookingComponent } from './components/venue-booking/venue-booking.component';

const routes: Routes = [
  { path: '', redirectTo: '/venues', pathMatch: 'full' },
  { path: 'venues', component: VenueDisplayComponent },
  { path: 'bookings', component: VenueBookingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 