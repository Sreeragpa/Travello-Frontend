import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Socket,io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { IResponse } from '../models/httpResponse.models';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  private socket!: Socket;
  constructor() { }
  connectWithToken(token: string) {
    this.socket = io(environment.socketUrl, {
      auth: {
        token: token
      }
    });
    this.socket.connect();

    this.socket.on('followNotification', (data: any) => {
      console.log("hehhehh");
      
      console.log(data); 
    });
  }


  emit<T, R>(event: string, data?: T): Observable<IResponse<R>> {
    return new Observable<IResponse<R>>(observer => {
      this.socket.emit(event, data, (response: IResponse<R>) => {
        observer.next(response);
        observer.complete();
      });

      // Cleanup function
      return () => {
        this.socket.off(event);
      };
    });
  }

  
    // Listen for a socket event
    on<T>(event: string): Observable<IResponse<T>> {
      return new Observable<IResponse<T>>(observer => {
        this.socket.on(event, (response: IResponse<T>) => {
           observer.next(response);
        });
      });
    }

  disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
