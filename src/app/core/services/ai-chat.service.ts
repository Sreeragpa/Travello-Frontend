import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IResponse } from '../models/httpResponse.models';
import { ITrip } from '../models/trip.model';

export interface IAiTripChatRequest {
  message: string;
  // Add optional context fields here if your backend supports them (e.g. tripId, history, userId).
}

export interface IAiTripChatResponse {
  reply: string;
  trips: ITrip[];
}

@Injectable({
  providedIn: 'root'
})
export class AiChatService {
  private apiUrl = `${environment.backendDomain}/api/ai/trip-chat`;

  constructor(private http: HttpClient) {}

  tripChat(message: string): Observable<IResponse<IAiTripChatResponse>> {
    const body: IAiTripChatRequest = { message };
    return this.http.post<IResponse<IAiTripChatResponse>>(this.apiUrl, body);
  }
}

