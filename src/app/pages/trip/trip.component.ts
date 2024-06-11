import { Component } from '@angular/core';
import { SlideNavComponent } from "../../shared/widgets/slide-nav/slide-nav.component";
import { TripItemComponent } from "../../shared/widgets/trip-item/trip-item.component";
import { TripService } from '../../core/services/trip.service';
import { ITrip } from '../../core/models/trip.model';

@Component({
    selector: 'app-trip',
    standalone: true,
    templateUrl: './trip.component.html',
    styleUrl: './trip.component.css',
    imports: [SlideNavComponent, TripItemComponent]
})
export class TripComponent {
    trips!: ITrip[]
    navItems: string[] = ['Following','Nearby']
    constructor(private tripService: TripService){}
    onNavChange(nav: string) {
        console.log(nav);
        if(nav=="Following"){
            this.tripService.getTrips("following").subscribe({
                next:(res)=>{
                    this.trips = res.data
                },
                error:(err)=>{
                    console.log(err);
                    
                }
            })
        }else{
            this.tripService.getTrips("nearby").subscribe({
                next:(res)=>{
                    this.trips = res.data
                },
                error:(err)=>{
                    console.log(err);
                    
                }
            })
        }
    }

    ngOnInit() {
        this.tripService.getTrips("following").subscribe({
            next:(res)=>{
                this.trips = res.data
            },
            error:(err)=>{
                console.log(err);
                
            }
        })
    }



}
