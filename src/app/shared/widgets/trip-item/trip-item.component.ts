import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IJoinTrip, ITrip } from '../../../core/models/trip.model';
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

  @Output() followButton: EventEmitter<string> = new EventEmitter()
  @Output() unfollowButton: EventEmitter<string> = new EventEmitter()
  @Output() JoinButton: EventEmitter<IJoinTrip> = new EventEmitter()
  @Input({required:true}) tripData!: ITrip

  follow(followingid: string | undefined){
    this.followButton.emit(followingid as string)
  }
  unfollow(followingid: string | undefined){
    this.unfollowButton.emit(followingid as string)
  }
  postdata: any = {
    user: { username: "Sreerag" }
  }
  onJoin(recipient: string | undefined, type: string, tripid: string | undefined) {
    const data: IJoinTrip = {
      recipient: recipient as string,
      type: type,
      tripid: tripid as string
      
    }
    this.JoinButton.emit(data)
  }

}
