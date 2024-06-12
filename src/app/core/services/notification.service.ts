import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { IResponse } from '../models/httpResponse.models';
import { INotification } from '../models/notification.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }
  private apiUrl: string = `${environment.backendDomain}/api/notification`
  
  getNotification():Observable<IResponse<INotification[]>>{
    return this.http.get<IResponse<INotification[]>>(this.apiUrl + '/get-notification');
  } 

}
