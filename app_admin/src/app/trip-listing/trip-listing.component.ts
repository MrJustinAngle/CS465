import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService],
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService // Ensure injected
  ) {}

  ngOnInit(): void {
    this.getTrips();
  }

  private getTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.trips = value;
        this.message =
          value.length > 0
            ? `There are ${value.length} trips available.`
            : 'No trips found in the database.';
      },
      error: (error: any) => {
        console.error('Error retrieving trips:', error);
      },
    });
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn(); // Correct implementation
  }

  public addTrip(): void {
    console.log('Navigating to Add Trip');
    this.router.navigate(['add-trip']);
  }
}
