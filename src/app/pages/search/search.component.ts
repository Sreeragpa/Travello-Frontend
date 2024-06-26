import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { SearchProfileCardComponent } from "../../shared/widgets/search-profile-card/search-profile-card.component";
import { SearchTripCardComponent } from "../../shared/widgets/search-trip-card/search-trip-card.component";
import { UserService } from '../../core/services/user.service';
import { TripService } from '../../core/services/trip.service';
import IUser from '../../core/models/user.models';
import { ITrip } from '../../core/models/trip.model';
import { IResponse } from '../../core/models/httpResponse.models';
enum tabs {
  profiles = 'profiles',
  trips = 'trips'
}

@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    imports: [CommonModule, FormsModule, SearchProfileCardComponent, SearchTripCardComponent]
})

export class SearchComponent {

  activeTab: string = 'profiles';
  sliderPosition: string = '0%';
  tabs = tabs;
  trips: ITrip[] = []
  profiles: IUser[] = []
  private searchValue: Subject<string> = new Subject<string>

  constructor(private userService: UserService,private tripService: TripService){}

  ngOnInit() {
    this.searchValue.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchKey: string) => {
        if (searchKey.trim()) {
          if (this.activeTab === tabs.profiles) {
            return this.userService.searchUsers(searchKey);
          } else if (this.activeTab === tabs.trips) {
            return this.tripService.searchTrips(searchKey);
          }
        }
        return of(null); 
      }),
      tap((searchResult: IResponse<IUser[]> | IResponse<ITrip[]> | null) => {
        if (searchResult) {
          if (this.activeTab === tabs.profiles) {
            this.profiles = searchResult.data as IUser[]; 
          } else if (this.activeTab === tabs.trips) {
            this.trips = searchResult.data as ITrip[]; 
          }
        } else {
          this.profiles = []; // Clear users array
          this.trips = []; // Clear trips array
        }
      })
    ).subscribe();
  }

  selectTab(tab: string) {
    this.activeTab = tab;
    this.sliderPosition = tab === 'profiles' ? '0%' : '60%';
  }

  onSearch($event: any){
    let query = $event.target.value;
    this.searchValue.next(query)
  }

}
