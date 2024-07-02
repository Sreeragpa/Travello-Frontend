import { Injectable } from '@angular/core';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

 private scrollSubject = new Subject<IInfiniteScrollEvent>();
 scroll$ = this.scrollSubject.asObservable();

 emitScrollSubject(event: IInfiniteScrollEvent){
    this.scrollSubject.next(event)
 }

}
