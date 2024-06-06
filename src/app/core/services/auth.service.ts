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
    return this.http.post(this.apiUrl + '/signin', data);
  }

  signup(data:ISignup): Observable<any>{
    return this.http.post(this.apiUrl + '/signup',data)
  }

  verifyOtp(data: IOtpVerify){
    return this.http.post(this.apiUrl + '/verify-otp',data)
  }

  isAuthenticated(): Observable<boolean> {
    // console.log(this.cookieService.check('authToken'));
      console.log('authservice');
      
    return this.http.get<any>(`${this.apiUrl}/check-auth`)
      .pipe(
        tap(response => console.log('Response from server:', response)),
        map(response => response.status === 'authenticated'),
        catchError(() => of(false)) 
      );
  }

  logout(){
    return this.http.post(this.apiUrl + '/logout','')
  }


}
