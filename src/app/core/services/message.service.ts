import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../models/httpResponse.models';
import { IMessage } from '../models/message.model';
import { environment } from '../../../environments/environment.development';
import { API_URLS } from '../constants/apiurl.constants';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiUrl: string = `${environment.backendDomain}${API_URLS.MESSAGE.BASE}`

  constructor(private http: HttpClient) { }

  getMessages(conversationid: string):Observable<IResponse<IMessage[]>>{
    return this.http.get<IResponse<IMessage[]>>(`${this.apiUrl}${API_URLS.MESSAGE.GET_MESSAGE}/${conversationid}`)
  }

  sendMessage(conversationid: string,text: string):Observable<IResponse<IMessage>>{
    return this.http.post<IResponse<IMessage>>(`${this.apiUrl}${API_URLS.MESSAGE.SEND_MESSAGE}`,{conversationid,text})

  }
}
