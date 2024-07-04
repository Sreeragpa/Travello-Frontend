import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IStatisticsData } from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private userStatisticsSubject = new BehaviorSubject<IStatisticsData[] | null>(null);
  userStatistics$ = this.userStatisticsSubject.asObservable();

  private postStatisticsSubject = new BehaviorSubject<IStatisticsData[] | null>(null);
  postStatistics$ = this.postStatisticsSubject.asObservable();

  private tripStatisticsSubject = new BehaviorSubject<IStatisticsData[] | null>(null);
  tripStatistics$ = this.tripStatisticsSubject.asObservable();

  updateUserStatistics(data: any) {
    this.userStatisticsSubject.next(data);
  }

  updatePostStatistics(data: any) {
    this.postStatisticsSubject.next(data);
  }

  updateTripStatistics(data: any) {
    this.tripStatisticsSubject.next(data);
  }
}
