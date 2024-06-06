import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private apiUrl: string = `${environment.backendDomain}/api/follow`
  constructor(private http: HttpClient) { }

  followAccount(followingid: string):Observable<any>{
    return this.http.post<any>(this.apiUrl + '/follow',{followingid})
  }

  unfollowAccount(followingid: string):Observable<any>{
    const options = {body: { followingid }};
    return this.http.delete<any>(this.apiUrl + '/unfollow',options)
  }

  getFollowCount(){
    return this.http.get<any>(this.apiUrl + '/count')
  }
}
