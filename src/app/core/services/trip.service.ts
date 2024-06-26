import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { IJoinTrip, ITrip, ITripEditForm } from '../models/trip.model';
import { Observable } from 'rxjs';
import { IResponse } from '../models/httpResponse.models';
import { environment } from '../../../environments/environment.development';
import { IUserLocation } from './geolocation.service';
import { API_URLS } from '../constants/apiurl.constants';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl: string = `${environment.backendDomain}${API_URLS.TRIPS.BASE}`;


  constructor(private http: HttpClient, private toastService: ToastService) { }


  addTrip(data: ITrip): Observable<IResponse<ITrip>> {
    return this.http.post<IResponse<ITrip>>(`${this.apiUrl}${API_URLS.TRIPS.ADD_TRIP}`, data);
  }

  getTrips(query: string, userLocation: IUserLocation = { latitude: 0, longitude: 0 }): Observable<IResponse<ITrip[]>> {
    return this.http.get<IResponse<ITrip[]>>(`${this.apiUrl}${API_URLS.TRIPS.GET_TRIPS}?by=${query}&long=${userLocation.longitude}&lat=${userLocation.latitude}`);
  }

  getSingleTrip(tripid: string): Observable<IResponse<ITrip[]>> {
    return this.http.get<IResponse<ITrip[]>>(`${this.apiUrl}${API_URLS.TRIPS.GET_SINGLE_TRIP(tripid)}`);
  }

  joinTrip(data: IJoinTrip): Observable<IResponse<IJoinTrip>> {
    return this.http.post<IResponse<IJoinTrip>>(`${this.apiUrl}${API_URLS.TRIPS.JOIN_TRIP}`, data);
  }

  acceptTripRequest(notificationid: string, memberid: string, tripid: string) {
    const data = { memberid, tripid, notificationid };
    return this.http.post<IResponse<string>>(`${this.apiUrl}${API_URLS.TRIPS.ACCEPT_TRIP_REQUEST}`, data);
  }

  getTripCount(profileid?: string): Observable<IResponse<{ count: number }>> {
    if (profileid) {
      return this.http.get<IResponse<{ count: number }>>(`${this.apiUrl}${API_URLS.TRIPS.PROFILE_TRIP_COUNT(profileid)}`);

    } else {
      return this.http.get<IResponse<{ count: number }>>(`${this.apiUrl}${API_URLS.TRIPS.TRIP_COUNT}`);
    }
  }

  getUserTrips(profileid: string): Observable<IResponse<ITrip[]>> {
    if (profileid) {
      return this.http.get<IResponse<ITrip[]>>(`${this.apiUrl}${API_URLS.TRIPS.USER_PROFILE_TRIPS(profileid)}`);

    } else {
      return this.http.get<IResponse<ITrip[]>>(`${this.apiUrl}${API_URLS.TRIPS.USER_TRIPS}`);

    }
  }

  updateTrip(tripid: string, data: ITripEditForm): Observable<IResponse<ITrip>> {
    return this.http.put<IResponse<ITrip>>(`${this.apiUrl}${API_URLS.TRIPS.EDIT_TRIP(tripid)}`, data);
  }

  searchTrips(searchKey: string): Observable<IResponse<ITrip[]>> {
    return this.http.get<IResponse<ITrip[]>>(`${this.apiUrl}${API_URLS.TRIPS.SEARCH_TRIP(searchKey)}`);
  }
}
