import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IPlaceSuggestion } from '../models/mapService.models';
import { API_URLS } from '../constants/apiurl.constants';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private apiUrl = API_URLS.MAP.BASE;
  constructor(private http:HttpClient) {

   }

   autoComplete(text: string): Observable<IPlaceSuggestion>{
    return this.http.get<IPlaceSuggestion>(`${this.apiUrl}${API_URLS.MAP.AUTO_COMPLETE(text,environment.geoapifyKey)}`)
   }  
}
