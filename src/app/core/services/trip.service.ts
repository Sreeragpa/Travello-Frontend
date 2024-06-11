import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { ITrip } from '../models/trip.model';
import { Observable } from 'rxjs';
import { IResponse } from '../models/httpResponse.models';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl: string = `${environment.backendDomain}/api/trip`


  constructor(private http: HttpClient, private toastService: ToastService) { }

  addTrip(data: ITrip):Observable<IResponse<ITrip>>{
    return this.http.post<IResponse<ITrip>>(this.apiUrl + '/add-trip',data)
  }

  getTrips(query: string): Observable<IResponse<ITrip[]>>{
    return this.http.get<IResponse<ITrip[]>>(`${this.apiUrl}/get-trip?by=${query}`)
  }
}
