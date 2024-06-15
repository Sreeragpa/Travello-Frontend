import { Component, Input } from '@angular/core';
import { ITrip } from '../../../core/models/trip.model';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trip-grid',
  standalone: true,
  imports: [DatePipe,RouterLink],
  templateUrl: './trip-grid.component.html',
  styleUrl: './trip-grid.component.css'
})
export class TripGridComponent {
  @Input({required: true}) trips: ITrip[] = []
}
