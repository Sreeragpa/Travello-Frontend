import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { IResponse } from '../models/httpResponse.models';
import { INotification } from '../models/notification.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from '../constants/apiurl.constants';
// import { Socket } from 'ngx-socket-io';
import { io,Socket } from 'socket.io-client';
import { Manager } from "socket.io-client";



@Injectable({
  providedIn: 'root'
})
export class NotificationService {  
  private socket!: Socket;
  private notificationSubject$ = new Subject<boolean>()
  constructor(private http: HttpClient) { }
  // private apiUrl: string = `${environment.backendDomain}/api/notification`
  private apiUrl: string = `${environment.backendDomain}${API_URLS.NOTIFICATION.BASE}`

  getNotificationSignal(): Observable<boolean>{
    return this.notificationSubject$.asObservable()
  }

  incrementNotification(){
    this.notificationSubject$.next(true)
  }

  decrementNotification(){
    this.notificationSubject$.next(false)
  }

  

  
  getNotification():Observable<IResponse<INotification[]>>{
    return this.http.get<IResponse<INotification[]>>(`${this.apiUrl}${API_URLS.NOTIFICATION.GET_NOTIFICATION}`);
  } 

  getNotificationCount(): Observable<IResponse<number>>{
    return this.http.get<IResponse<number>>(`${this.apiUrl}${API_URLS.NOTIFICATION.GET_COUNT}`);
  }

  markAsRead(notificationid: string): Observable<IResponse<INotification>>{
    return this.http.post<IResponse<INotification>>(`${this.apiUrl}${API_URLS.NOTIFICATION.MARK_AS_READ}`,{notificationid});
  }

 
}
