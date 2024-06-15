import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost, IPostLike } from '../models/post.models';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, map, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { IResponse } from '../models/httpResponse.models';
import { API_URLS } from '../constants/apiurl.constants';



@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient,private cookieService: CookieService) { }
  private apiUrl: string = `${environment.backendDomain}${API_URLS.POSTS.BASE}`

  createPost(data: IPost):Observable<IPost>{
    return this.http.post<IPost>(`${this.apiUrl}${API_URLS.POSTS.ADD_POST}`,data);
  } 

  getUserPosts(){
    return this.http.get<IResponse<IPost[]>>(`${this.apiUrl}${API_URLS.POSTS.GET_USER_POSTS}`)
  }

  getAllPosts(){
  
    return this.http.get<IResponse<IPost[]>>(`${this.apiUrl}${API_URLS.POSTS.GET_ALL_POSTS}`);
  }

  getSinglePost(postid: string){
    return this.http.get<IResponse<IPost[]>>(`${this.apiUrl}${API_URLS.POSTS.GET_SINGLE_POST(postid)}`);
  }

  likePost(postid: string){
    return this.http.post<any>(`${this.apiUrl}${API_URLS.POSTS.LIKE_POST}`,{postid});
  }

  unlikePost(postid: string){
    const options = {
      body: { postid },
    };
    return this.http.delete<IResponse<IPostLike>>(`${this.apiUrl}${API_URLS.POSTS.UNLIKE_POST}`,options);
  }

  savePost(postid: string){
    return this.http.put<any>(`${this.apiUrl}${API_URLS.POSTS.SAVE_POST}`,{postid});
  }
  unsavePost(postid: string){
    return this.http.delete<any>(`${this.apiUrl}${API_URLS.POSTS.UNSAVE_POST(postid)}`);
  } 
  
  getSavedPost(){
    return this.http.get<IResponse<IPost[]>>(`${this.apiUrl}${API_URLS.POSTS.GET_SAVED_POST}`);
  }

  getPostCount(){
    return this.http.get<IResponse<{count:number}>>(`${this.apiUrl}${API_URLS.POSTS.GET_POST_COUNT}`);
    
  }

 
}
