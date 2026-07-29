import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Socket,io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { IResponse } from '../models/httpResponse.models';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  private socket!: Socket;
  constructor(private zone: NgZone) { }
  connectWithToken(token: string) {
    this.socket = io(environment.socketUrl, {
      auth: {
        token: token
      }
    });
    this.socket.connect();

    this.socket.on('followNotification', (data: any) => {
    });
  }


  emit<T, R>(event: string, data?: T): Observable<IResponse<R>> {
    return new Observable<IResponse<R>>(observer => {
      this.socket.emit(event, data, (response: IResponse<R>) => {
        this.zone.run(() => {
          observer.next(response);
          observer.complete();
        });
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
        this.zone.run(() => observer.next(response));
      });

      return () => {
        this.socket.off(event);
      };
    });
  }

  emitEvent<T>(event: string, data?: T): void {
    this.socket.emit(event, data);
  }

  disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
