import { Component, Input } from '@angular/core';
import { ITrip } from '../../../core/models/trip.model';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trip-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './trip-item.component.html',
  styleUrl: './trip-item.component.css'
})
export class TripItemComponent {
  @Input({required:true}) tripData!: ITrip
  unfollow(arg0: any) {
    throw new Error('Method not implemented.');
  }
  follow(arg0: any) {
    throw new Error('Method not implemented.');
  }
  postdata: any = {
    user: { username: "Sreerag" }
  }

}
