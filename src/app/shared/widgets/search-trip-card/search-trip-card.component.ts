import { Component, Input } from '@angular/core';
import { ITrip } from '../../../core/models/trip.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-trip-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search-trip-card.component.html',
  styleUrl: './search-trip-card.component.css'
})
export class SearchTripCardComponent {
  @Input() trips:ITrip[] = []
}
