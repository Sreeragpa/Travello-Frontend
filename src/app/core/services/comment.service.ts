import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  constructor() { }
  private toggleComment$ = new Subject<string>()
  toggleComment(postid: string){
    this.toggleComment$.next(postid)
  }
  closeComment(){
    this.toggleComment$.next("false")
  }

  get gettoggleComment():Observable<string>{
    return this.toggleComment$.asObservable()
  }
}
