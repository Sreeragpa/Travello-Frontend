import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost, IPostLike } from '../models/post.models';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, map, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { IResponse } from '../models/httpResponse.models';



@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient,private cookieService: CookieService) { }
  private apiUrl: string = `${environment.backendDomain}/api/posts`

  createPost(data: IPost):Observable<IPost>{
    return this.http.post<IPost>(this.apiUrl + '/add-post', data);
  } 

  getUserPosts(){
    return this.http.get<IResponse<IPost[]>>(this.apiUrl + '/get-userpost')
  }

  getAllPosts(){
    return this.http.get<IResponse<IPost[]>>(this.apiUrl + '/get-post');
  }

  getSinglePost(postid: string){
    return this.http.get<IResponse<IPost[]>>(this.apiUrl + `/get-post/${postid}`);
  }

  likePost(postid: string){
    return this.http.post<any>(this.apiUrl + '/like',{postid});
  }

  unlikePost(postid: string){
    const options = {
      body: { postid },
    };
    return this.http.delete<IResponse<IPostLike>>(this.apiUrl + '/unlike',options);
  }

  savePost(postid: string){
    console.log('jee');
    
    return this.http.put<any>(this.apiUrl + '/save-post',{postid});
  }
  unsavePost(postid: string){
    console.log('jee');
    
    return this.http.delete<any>(`${this.apiUrl}/unsave-post/${postid}`);
  }
  
  getSavedPost(){
    return this.http.get<IResponse<IPost[]>>(`${this.apiUrl}/saved-post`);
  }

 
}
