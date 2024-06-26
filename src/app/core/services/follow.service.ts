import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../constants/apiurl.constants';
import { IResponse } from '../models/httpResponse.models';
import IFollow, { IFollowCount } from '../models/follow.models';
import { SocketioService } from './socketio.service';
import IUser from '../models/user.models';


@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private apiUrl: string = `${environment.backendDomain}${API_URLS.FOLLOW.BASE}`

  constructor(
    private http: HttpClient,
    private socketioService: SocketioService

  ) { }

  followAccount(followingid: string):Observable<IResponse<IFollow>>{
    return this.http.post<IResponse<IFollow>>(`${this.apiUrl}${API_URLS.FOLLOW.FOLLOW}`,{followingid})

  }

  unfollowAccount(followingid: string):Observable<IResponse<IFollow>>{
    const options = {body: { followingid }};
    return this.http.delete<IResponse<IFollow>>(`${this.apiUrl}${API_URLS.FOLLOW.UNFOLLOW}`,options)
  }

  getFollowCount(profileid: string): Observable<IResponse<IFollowCount>>{
    if(profileid){
      return this.http.get<IResponse<IFollowCount>>(`${this.apiUrl}${API_URLS.FOLLOW.GET_PROFILE_FOLLOW_COUNT(profileid)}`)
    }else{
      return this.http.get<IResponse<IFollowCount>>(`${this.apiUrl}${API_URLS.FOLLOW.GET_FOLLOW_COUNT}`)
    }
  }

  searchFollowingUsers(searchValue: string):Observable<IResponse<IUser[]>>{
    return this.http.get<IResponse<IUser[]>>(`${this.apiUrl}${API_URLS.FOLLOW.GET_FOLLOWING_USERS}?search=${searchValue}`)
  }
}
