import { Component } from '@angular/core';
import { SlideNavComponent } from "../../shared/widgets/slide-nav/slide-nav.component";
import { TripItemComponent } from "../../shared/widgets/trip-item/trip-item.component";
import { TripService } from '../../core/services/trip.service';
import { IJoinTrip, ITrip } from '../../core/models/trip.model';
import { ToastService, ToastType } from '../../core/services/toast.service';
import { FollowService } from '../../core/services/follow.service';

@Component({
    selector: 'app-trip',
    standalone: true,
    templateUrl: './trip.component.html',
    styleUrl: './trip.component.css',
    imports: [SlideNavComponent, TripItemComponent]
})
export class TripComponent {

    trips!: ITrip[]
    navItems: string[] = ['Following', 'Nearby']
    constructor(private tripService: TripService,private toastService: ToastService,private followService:FollowService) { }
    onNavChange(nav: string) {
        console.log(nav);
        if (nav == "Following") {
            this.tripService.getTrips("following").subscribe({
                next: (res) => {
                    this.trips = res.data
                },
                error: (err) => {
                    console.log(err);

                }
            })
        } else {
            this.tripService.getTrips("nearby").subscribe({
                next: (res) => {
                    this.trips = res.data
                },
                error: (err) => {
                    console.log(err);

                }
            })
        }
    }

    ngOnInit() {
        this.tripService.getTrips("following").subscribe({
            next: (res) => {
                this.trips = res.data
                console.log(res.data);
                
            },
            error: (err) => {
                console.log(err);

            }
        })
    }

    joinTrip(data: IJoinTrip) {
        console.log(data);
        this.tripService.joinTrip(data).subscribe({
            next:(res)=>{

                
                this.toastService.showToast("Request Sent",ToastType.Normal)
                
            },
            error:(err)=>{
                console.log(err);
            }
        })

    }
    followAccount(followingid: string) {
        this.followService.followAccount(followingid).subscribe({
            next: (res) => {
                this.trips.map((trip) => {
                    if (trip.creator_id == followingid) {
                        trip.isuserfollowing = true
                    }
                })
            },
            error: (error) => {
                this.toastService.showToast("Something Wrong Happened", ToastType.Failure)
            }
        })
    }
    unfollowAccount(followingid: string) {
        this.followService.unfollowAccount(followingid).subscribe({
            next: (res) => {
                this.trips.map((trip) => {
                    if (trip.creator_id == followingid) {
                        trip.isuserfollowing = false
                    }
                })
            },
            error: (error) => {
                this.toastService.showToast("Something Wrong Happened", ToastType.Failure)
            }
        })
    }



}
