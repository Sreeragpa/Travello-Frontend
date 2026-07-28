import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scrollSubject = new Subject<void>();
  scroll$ = this.scrollSubject.asObservable();

  emitScrollSubject() {
    this.scrollSubject.next();
  }
}
