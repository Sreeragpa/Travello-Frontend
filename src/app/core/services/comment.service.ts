import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IComment } from '../models/comment.model';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../models/httpResponse.models';
import { API_URLS } from '../constants/apiurl.constants';

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private apiUrl: string = `${environment.backendDomain}${API_URLS.COMMENT.BASE}`
  
  constructor(private http: HttpClient) { }
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



  getPostComments(postid: string):Observable<IResponse<IComment[]>>{
    return this.http.get<IResponse<IComment[]>>(`${this.apiUrl}${API_URLS.COMMENT.GET_COMMENT(postid)}`)
  }

  addComment(postid: string, content: string):Observable<IResponse<IComment>>{
    return this.http.post<IResponse<IComment>>(`${this.apiUrl}${API_URLS.COMMENT.ADD_COMMENT}`,{postid,content})
  }
}
