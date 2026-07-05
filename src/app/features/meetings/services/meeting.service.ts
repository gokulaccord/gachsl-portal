import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { ApiResponse } from '../../../core/models/api-response.model';

import { Meeting } from '../models/meeting.model';
import { CreateMeeting } from '../models/create-meeting.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private apiUrl = `${environment.apiUrl}/Meetings`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<Meeting[]>> {
    return this.http.get<ApiResponse<Meeting[]>>(this.apiUrl);
  }

  getById(id: number): Observable<ApiResponse<Meeting>> {
    return this.http.get<ApiResponse<Meeting>>(`${this.apiUrl}/${id}`);
  }

  create(meeting: CreateMeeting): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, meeting);
  }

  update(id: number, meeting: Meeting): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/${id}`, meeting);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }

}