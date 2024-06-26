import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { API_URLS } from '../constants/apiurl.constants';
import IConversation from '../models/conversation.model';
import { Observable } from 'rxjs';
import { IResponse } from '../models/httpResponse.models';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private apiUrl: string = `${environment.backendDomain}${API_URLS.CONVERSATION.BASE}`

  constructor(private http: HttpClient) { }

  getAllConversation():Observable<IResponse<IConversation[]>>{
    return this.http.get<IResponse<IConversation[]>>(`${this.apiUrl}${API_URLS.CONVERSATION.GET_CONVERSATION}`)
  }

  createConversation(memberid: string):Observable<IResponse<IConversation>>{
    return this.http.post<IResponse<IConversation>>(`${this.apiUrl}${API_URLS.CONVERSATION.ADD_CONVERSATION}`,{member:memberid});
  }

  getSingleConversation(conversationid: string):Observable<IResponse<IConversation>>{
    return this.http.get<IResponse<IConversation>>(`${this.apiUrl}${API_URLS.CONVERSATION.GET_SINGLE_CONVERSATION(conversationid)}`)
  }
}
