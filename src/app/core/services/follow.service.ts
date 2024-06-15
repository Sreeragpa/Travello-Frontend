import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../constants/apiurl.constants';
import { IResponse } from '../models/httpResponse.models';
import IFollow, { IFollowCount } from '../models/follow.models';
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private apiUrl: string = `${environment.backendDomain}${API_URLS.FOLLOW.BASE}`

  constructor(private http: HttpClient) { }

  followAccount(followingid: string):Observable<IResponse<IFollow>>{
    return this.http.post<IResponse<IFollow>>(`${this.apiUrl}${API_URLS.FOLLOW.FOLLOW}`,{followingid})
  }

  unfollowAccount(followingid: string):Observable<IResponse<IFollow>>{
    const options = {body: { followingid }};
    return this.http.delete<IResponse<IFollow>>(`${this.apiUrl}${API_URLS.FOLLOW.UNFOLLOW}`,options)
  }

  getFollowCount(): Observable<IResponse<IFollowCount>>{
    return this.http.get<IResponse<IFollowCount>>(`${this.apiUrl}${API_URLS.FOLLOW.GET_FOLLOW_COUNT}`)
  }
}
