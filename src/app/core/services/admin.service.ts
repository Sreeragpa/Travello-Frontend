import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { API_URLS } from '../constants/apiurl.constants';
import { HttpClient } from '@angular/common/http';
import { IAdmin } from '../models/admin.model';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { IResponse } from '../models/httpResponse.models';
import { IStatisticsData } from '../models/trip.model';
import IUser from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl: string = `${environment.backendDomain}${API_URLS.ADMIN.BASE}`

  constructor(private http: HttpClient) { }

  login(data: IAdmin):Observable<IResponse<IAdmin>>{
    return this.http.post<IResponse<IAdmin>>(`${this.apiUrl}${API_URLS.ADMIN.LOGIN}`,{...data})
  }
  
  isAuthenticated():Observable<boolean>{
    return this.http.get<IResponse<string>>(`${this.apiUrl}${API_URLS.ADMIN.LOGIN}`)
    .pipe(
      map(response => response.status === 'authenticated'),
      catchError(() => of(false)) 
    );
  }

  getPostStatistics(period: number):Observable<IResponse<IStatisticsData[]>>{
    return this.http.get<IResponse<IStatisticsData[]>>(`${this.apiUrl}${API_URLS.ADMIN.GET_POST_STATISTICS(period)}`)
  }
  getTripStatistics(period: number):Observable<IResponse<IStatisticsData[]>>{
    return this.http.get<IResponse<IStatisticsData[]>>(`${this.apiUrl}${API_URLS.ADMIN.GET_TRIP_STATISTICS(period)}`)
  }
  getUserStatistics(period: number):Observable<IResponse<IStatisticsData[]>>{
    return this.http.get<IResponse<IStatisticsData[]>>(`${this.apiUrl}${API_URLS.ADMIN.GET_USER_STATISTICS(period)}`)
  }

  getAllUsers():Observable<IResponse<IUser[]>>{
    return this.http.get<IResponse<IUser[]>>(`${this.apiUrl}${API_URLS.ADMIN.GET_ALL_USERS}`)
  }

  searchUser(text: string):Observable<IResponse<IUser[]>>{
    return this.http.get<IResponse<IUser[]>>(`${this.apiUrl}${API_URLS.ADMIN.SEARCH_USER(text)}`)
  }

  blockUser(userid: string):Observable<IResponse<IUser>>{
    return this.http.post<IResponse<IUser>>(`${this.apiUrl}${API_URLS.ADMIN.BLOCK_USER(userid)}`,'')
  }

  unBlockUser(userid: string):Observable<IResponse<IUser>>{
    return this.http.post<IResponse<IUser>>(`${this.apiUrl}${API_URLS.ADMIN.UNBLOCK_USER(userid)}`,'')
  }

  logOut():Observable<IResponse<string>>{
    return this.http.post<IResponse<string>>(`${this.apiUrl}${API_URLS.ADMIN.LOGOUT}`,'')
  }

}
