import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarVisibilityService {
  private navBarVisibleSubject: Subject<boolean> = new BehaviorSubject<boolean>(true);
  navBarVisible$ = this.navBarVisibleSubject.asObservable();

  showNavBar() {
    this.navBarVisibleSubject.next(true);
  }

  hideNavBar() {
    this.navBarVisibleSubject.next(false);
  }

}
