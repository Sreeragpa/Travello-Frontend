import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IOtpVerify, ISignup, Ilogin } from '../models/auth.models';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,private cookieService: CookieService) { }
  private apiUrl: string = `${environment.backendDomain}/api/auth`
  login(data: Ilogin): Observable<any> {
    return this.http.post(this.apiUrl + '/signin', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true  // Include credentials (cookies) with the request
    });
  }

  signup(data:ISignup): Observable<any>{
    return this.http.post(this.apiUrl + '/signup',data,this.getHttpOptions())
  }

  verifyOtp(data: IOtpVerify){
    return this.http.post(this.apiUrl + '/verify-otp',data,this.getHttpOptions())
  }

  isAuthenticated(): Observable<boolean> {
    // console.log(this.cookieService.check('authToken'));
      console.log('authservice');
      
    return this.http.get<any>(`${this.apiUrl}/check-auth`, { withCredentials: true })
      .pipe(
        tap(response => console.log('Response from server:', response)),
        map(response => response.status === 'authenticated'),
        catchError(() => of(false)) 
      );
  }




  
  private getHttpOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  private postRequest<T>(endpoint: string, data: T): Observable<any> {
    return this.http.post(`${this.apiUrl}${endpoint}`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true  // Include credentials (cookies) with the request
    });
  }
  

}
