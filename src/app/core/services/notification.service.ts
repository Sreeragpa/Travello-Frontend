import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { IResponse } from '../models/httpResponse.models';
import { INotification } from '../models/notification.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../constants/apiurl.constants';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }
  // private apiUrl: string = `${environment.backendDomain}/api/notification`
  private apiUrl: string = `${environment.backendDomain}${API_URLS.NOTIFICATION.BASE}`

  
  getNotification():Observable<IResponse<INotification[]>>{
    return this.http.get<IResponse<INotification[]>>(`${this.apiUrl}${API_URLS.NOTIFICATION.GET_NOTIFICATION}`);
  } 

}
