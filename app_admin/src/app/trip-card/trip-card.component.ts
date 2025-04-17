import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],
})
export class TripCardComponent {
  @Input('trip') trip!: Trip;

  public editTrip(): void {
    console.log('Editing trip:', this.trip);
  }
}
