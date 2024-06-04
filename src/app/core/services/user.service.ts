import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = `${environment.backendDomain}/api/user`

  constructor(private http: HttpClient) {}
   updateProfileimg(profileimg: string):Observable<any>{
    return this.http.put<any>(this.apiUrl + '/add-profileimg',{profileimg})
  }
  getUser(): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/get-user')
  }

  updatePassword(currentPassword: string,newPassword: string): Observable<any>{
    const data = {currentPassword,newPassword}
    return this.http.put<any>(this.apiUrl+"/update-password",data)
  }

  updateProfile(data: any){
    return this.http.put<any>(this.apiUrl + '/update-profile',data)
  }
} 
