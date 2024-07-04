import { Component } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';
import { INotification } from '../../core/models/notification.model';
import { TripService } from '../../core/services/trip.service';
import { NOTIFICATION_TYPE } from '../../core/enums/notification.enums';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  constructor(private notificationService: NotificationService,private tripService: TripService){}
  notifications!:INotification[];
  notificationType = NOTIFICATION_TYPE
  ngOnInit() {
    this.notificationService.getNotification().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.notifications = res.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }

  onAccept(notificationid: string,memberid: string, tripid: string){
    this.tripService.acceptTripRequest(notificationid,memberid,tripid).subscribe({
      next:(res)=>{
        console.log(res);
        this.notificationService.decrementNotification()
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    console.log(notificationid,memberid,tripid);
    
  }

  onMarkAsread(notificationid: string){
    this.notificationService.markAsRead(notificationid).subscribe({
      next:(res)=>{
        console.log(res);
        this.notificationService.decrementNotification()

        const id = res.data._id;
        this.notifications = this.notifications.filter((notification)=>{
          return notification._id!=id
        })
      },
      error:(err)=>{

      }
    })
  }
}
