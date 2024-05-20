import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IPlaceSuggestion } from '../models/mapService.models';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private apiUrl = 'https://api.geoapify.com/v1/geocode';
  // /autocomplete?text=Mosco&apiKey=177668e9d9044d7b839472dd492b20d3
  constructor(private http:HttpClient) {

   }

   autoComplete(text: string): Observable<IPlaceSuggestion>{
    return this.http.get<IPlaceSuggestion>(this.apiUrl + `/autocomplete?text=${text}&apiKey=${environment.geoapifyKey}`)
   }  
}
