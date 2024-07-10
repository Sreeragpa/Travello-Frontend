import { Component, Input } from '@angular/core';
import { ITrip } from '../../../core/models/trip.model';
import { RouterLink } from '@angular/router';
import { TextslicePipe } from "../../pipes/textslice.pipe";

@Component({
  selector: 'app-search-trip-card',
  standalone: true,
  imports: [RouterLink, TextslicePipe],
  templateUrl: './search-trip-card.component.html',
  styleUrl: './search-trip-card.component.css'
})
export class SearchTripCardComponent {
  @Input() trips:ITrip[] = []
}
