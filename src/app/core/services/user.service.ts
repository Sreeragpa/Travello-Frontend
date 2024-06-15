import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../constants/apiurl.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = `${environment.backendDomain}${API_URLS.USER.BASE}`;

  constructor(private http: HttpClient) { }

  updateProfileimg(profileimg: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${API_URLS.USER.UPDATE_PROFILE_IMG}`, { profileimg });
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${API_URLS.USER.GET_USER}`);
  }

  updatePassword(currentPassword: string, newPassword: string): Observable<any> {
    const data = { currentPassword, newPassword };
    return this.http.put<any>(`${this.apiUrl}${API_URLS.USER.UPDATE_PASSWORD}`, data);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${API_URLS.USER.UPDATE_PROFILE}`, data);
  }
} 
