import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IOtpVerify, ISignup, Ilogin } from '../models/auth.models';
import { CookieService } from 'ngx-cookie-service';
import { API_URLS } from '../constants/apiurl.constants';
import { IResponse } from '../models/httpResponse.models';
import IUser from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  private apiUrl: string = `${environment.backendDomain}${API_URLS.AUTH.BASE}`
  private authToken: string | null = null;

  login(data: Ilogin): Observable<IResponse<string>> {
    return this.http.post<IResponse<string>>(`${this.apiUrl}${API_URLS.AUTH.SIGNIN}`, data)
      .pipe(
        tap(response =>{
          console.log(response.data);
          
          const token = response.data;
          if(token){
            this.authToken = token;
          }
        })
      )
  }

  signup(data:ISignup): Observable<IResponse<IUser>>{
    return this.http.post<IResponse<IUser>>(`${this.apiUrl}${API_URLS.AUTH.SIGNUP}`,data)
  }

  verifyOtp(data: IOtpVerify): Observable<IResponse<string>>{
    return this.http.post<IResponse<string>>(`${this.apiUrl}${API_URLS.AUTH.VERIFY_OTP}`,data)
  }

  isAuthenticated(): Observable<boolean>{

    return this.http.get<IResponse<string>>(`${this.apiUrl}${API_URLS.AUTH.CHECK_AUTH}`)
      .pipe(
        tap(response => console.log('Response from server:', response)),
        map(response => response.status === 'authenticated'),
        catchError(() => of(false)) 
      );
  }

  logout(): Observable<IResponse<string>>{
    return this.http.post<IResponse<string>>(`${this.apiUrl}${API_URLS.AUTH.LOGOUT}`,'')
  }

  getAuthToken() {
    return this.http.get<IResponse<string>>(`${this.apiUrl}${API_URLS.AUTH.GET_TOKEN}`)
    
    // return this.http.post<IResponse<string>>(`${this.apiUrl}${API_URLS.AUTH.LOGOUT}`,'')
  }

  forgotPassword(): Observable<IResponse<string>>{
    return this.http.post<IResponse<string>>(`${this.apiUrl}${API_URLS.AUTH.FORGOT_PASSWORD}`,'')
  }


}
