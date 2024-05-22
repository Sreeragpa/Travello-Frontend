import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../models/post.models';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, map, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient,private cookieService: CookieService) { }
  private apiUrl: string = `${environment.backendDomain}/api/posts`

  createPost(data: IPost):Observable<IPost>{
    // return this.http.post<IPost>(this.apiUrl + '/add-post',data,this.getHttpOptions())
    return this.http.post<IPost>(this.apiUrl + '/add-post', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true // Include credentials (cookies) with the request
    });
  } 

  getAllPosts(){
    return this.http.get<any >(this.apiUrl + '/get-post', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true 
    });
  }

  likePost(postid: string){
    return this.http.post<any>(this.apiUrl + '/like',
    {postid},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true 
      });
    
  }

  unlikePost(postid: string){
    return this.http.post<any>(this.apiUrl + '/unlike',
    {postid},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true 
      });
  }

  private getHttpOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

 
}
