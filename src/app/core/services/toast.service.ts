import { Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';


export enum ToastType {
  Success = "Success",
  Failure = "Failure",
  Normal = "Normal"
}

interface ToastData {
  message: string;
  type: ToastType;
}


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }
  private showToast$ = new Subject<ToastData>();

  showToast(message: string,type: ToastType){
    this.showToast$.next({message,type});
  }

  get getToaster(): Observable<ToastData>{
    return this.showToast$.asObservable()
  }

}
