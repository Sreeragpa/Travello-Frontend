import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface IUserLocation { latitude: number, longitude: number }
export interface IGeolocationCoordinates {
  latitude: number;
  longitude: number;
  altitude?: number | null;
  accuracy: number;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

export interface IGeolocationPosition {
  coords: IGeolocationCoordinates;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  getCurrentPosition(): Observable<IGeolocationPosition>{
    return new Observable(observer => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          position =>{
            observer.next(position);
            observer.complete()
          },
          error=>{
            observer.error(error)
          }
        )
      }else{
        observer.error(new Error('Geolocation not Supported'))
      }
    })
  }
}
