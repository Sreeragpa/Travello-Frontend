import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../constants/apiurl.constants';
import IUser from '../models/user.models';
import { IResponse } from '../models/httpResponse.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = `${environment.backendDomain}${API_URLS.USER.BASE}`;

  constructor(private http: HttpClient) { }

  updateProfileimg(profileimg: string): Observable<IResponse<IUser>> {
    return this.http.put<IResponse<IUser>>(`${this.apiUrl}${API_URLS.USER.UPDATE_PROFILE_IMG}`, { profileimg });
  }

  getUser(): Observable<IResponse<IUser>> {
    return this.http.get<IResponse<IUser>>(`${this.apiUrl}${API_URLS.USER.GET_USER}`);
  }

  updatePassword(currentPassword: string, newPassword: string): Observable<IResponse<string>> {
    const data = { currentPassword, newPassword };
    return this.http.put<IResponse<string>>(`${this.apiUrl}${API_URLS.USER.UPDATE_PASSWORD}`, data);
  }

  updateProfile(data: any): Observable<IResponse<IUser>> {
    return this.http.put<IResponse<IUser>>(`${this.apiUrl}${API_URLS.USER.UPDATE_PROFILE}`, data);
  }
} 
