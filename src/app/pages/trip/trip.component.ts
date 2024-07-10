import { Component } from '@angular/core';
import { SlideNavComponent } from '../../shared/widgets/slide-nav/slide-nav.component';
import { TripItemComponent } from '../../shared/widgets/trip-item/trip-item.component';
import { TripService } from '../../core/services/trip.service';
import { IJoinTrip, ITrip } from '../../core/models/trip.model';
import { ToastService, ToastType } from '../../core/services/toast.service';
import { FollowService } from '../../core/services/follow.service';
import { TripItemSkeletonComponent } from '../../shared/widgets/trip-item-skeleton/trip-item-skeleton.component';
import { ActivatedRoute } from '@angular/router';
import { GeolocationService, IGeolocationPosition, IUserLocation } from '../../core/services/geolocation.service';
import { map, switchMap, catchError, of } from 'rxjs';
import { ChatModalComponent } from "../../shared/widgets/chat-modal/chat-modal.component";
import { ScrollService } from '../../core/services/scroll.service';

@Component({
    selector: 'app-trip',
    standalone: true,
    templateUrl: './trip.component.html',
    styleUrl: './trip.component.css',
    imports: [SlideNavComponent, TripItemComponent, TripItemSkeletonComponent, ChatModalComponent]
})
export class TripComponent {
  currentNav: string = 'Following' 
  isLoading: boolean = true;
  trips!: ITrip[];
  navItems: string[] = ['Following', 'Nearby'];
  tripid!: string;
  userLocation!: IUserLocation
  chatModal: boolean= false;
  link!: string;
  currentPageFollow: number = 1
  currentPageNearby: number = 1
  constructor(
    private tripService: TripService,
    private toastService: ToastService,
    private followService: FollowService,
    private route: ActivatedRoute,
    private geolocationService: GeolocationService,
    private scrollService: ScrollService
  ) {}
  onNavChange(nav: string) {
    this.currentPageFollow = 1;
    this.currentPageNearby = 1; 
    this.currentNav = nav
    this.isLoading = true;
    this.trips = []

    if (nav == 'Following') {
      this.getFollowingTrips()
    } else {

      this.geolocationService.getCurrentPosition().pipe(
        map((position: IGeolocationPosition) => ({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })),
        switchMap((location) => {
          this.userLocation = location;
          return this.tripService.getTrips('nearby',this.currentPageNearby, this.userLocation);
        }),
        catchError((error) => {
          console.error('Error:', error);
          return of(null); // Return an empty observable to continue the stream
        })
      ).subscribe({
        next: (res) => {
          if (res) {
            this.trips = res.data;
            console.log(this.trips);
            
              setTimeout(() => {
                this.isLoading = false;
              }, 1000);
  
          }
        }
      });
      
    
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
        this.tripid = params.get('id')!
    })



    if(this.tripid){
        console.log(this.tripid);
        
        this.tripService.getSingleTrip(this.tripid).subscribe({
            next:(res)=>{
              console.log(res);
              this.trips = res.data
                setTimeout(() => {
                    this.isLoading = false;
                  }, 1000);
            },
            error:(err)=>{
                console.log(err);
            }
        })
    }else{
      this.getFollowingTrips()
      this.scrollService.scroll$.subscribe((res)=>{
        if(!this.isLoading){
          this.loadMoreTrips();
        }
      })
    }
 
  }
  loadMoreTrips() {
    if(this.currentNav == "Following"){
      this.currentPageFollow++;
      this.getFollowingTrips()
    }else{
      this.currentPageNearby++;
      this.tripService.getTrips('nearby',this.currentPageNearby, this.userLocation).subscribe({
        next:(res)=>{
          this.trips = [...this.trips,...res.data]
        }
      })

    }
  }

  getFollowingTrips(){
    this.tripService.getTrips('following',this.currentPageFollow).subscribe({
      next: (res) => {
        (this.trips)?this.trips = [...this.trips,...res.data]: this.trips = res.data
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  joinTrip(data: IJoinTrip) {
    console.log(data);
    this.tripService.joinTrip(data).subscribe({
      next: (res) => {
        this.toastService.showToast('Request Sent', ToastType.Normal);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  followAccount(followingid: string) {
    this.followService.followAccount(followingid).subscribe({
      next: (res) => {
        this.trips.map((trip) => {
          if (trip.creator_id == followingid) {
            trip.isuserfollowing = true;
          }
        });
      },
      error: (error) => {
        this.toastService.showToast(
          'Something Wrong Happened',
          ToastType.Failure
        );
      },
    });
  }
  unfollowAccount(followingid: string) {
    this.followService.unfollowAccount(followingid).subscribe({
      next: (res) => {
        this.trips.map((trip) => {
          if (trip.creator_id == followingid) {
            trip.isuserfollowing = false;
          }
        });
      },
      error: (error) => {
        this.toastService.showToast(
          'Something Wrong Happened',
          ToastType.Failure
        );
      },
    });
  }

  sharetoChatModal(tripid?: string) {
    this.link= `${window.location.origin}/trips/${tripid}`;
    this.chatModal = !this.chatModal
}
}
