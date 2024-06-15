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

@Component({
  selector: 'app-trip',
  standalone: true,
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css',
  imports: [SlideNavComponent, TripItemComponent, TripItemSkeletonComponent],
})
export class TripComponent {
  isLoading: boolean = true;
  trips!: ITrip[];
  navItems: string[] = ['Following', 'Nearby'];
  tripid!: string;
  userLocation!: IUserLocation
  constructor(
    private tripService: TripService,
    private toastService: ToastService,
    private followService: FollowService,
    private route: ActivatedRoute,
    private geolocationService: GeolocationService
  ) {}
  onNavChange(nav: string) {
    this.isLoading = true
    console.log(nav);
    if (nav == 'Following') {
      this.tripService.getTrips('following').subscribe({
        next: (res) => {
          this.trips = res.data;
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      // this.geolocationService.getCurrentPosition().subscribe({
      //   next:(res)=>{
      //     console.log(res);
      //     this.userLocation.longitude = res.coords.longitude
      //     this.userLocation.latitude = res.coords.latitude

      //     this.tripService.getTrips('nearby',this.userLocation).subscribe({
      //       next: (res) => {
      //         console.log(res);
              
      //         this.trips = res.data;
      //       },
      //       error: (err) => {
      //         console.log(err);
      //       },
      //     });
          
      //   },
      //   error:(err)=>{
      //     console.log(err);
          
      //   }
      // })

      this.geolocationService.getCurrentPosition().pipe(
        map((position: IGeolocationPosition) => ({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })),
        switchMap((location) => {
          this.userLocation = location;
          return this.tripService.getTrips('nearby', this.userLocation);
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
                this.trips = res.data
                console.log(res);
                setTimeout(() => {
                    this.isLoading = false;
                  }, 1000);
            },
            error:(err)=>{
                console.log(err);
            }
        })
    }else{
        this.tripService.getTrips('following').subscribe({
            next: (res) => {
              this.trips = res.data;
              setTimeout(() => {
                this.isLoading = false;
              }, 1000);
            },
            error: (err) => {
              console.log(err);
            },
          });
    }
 
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
}
