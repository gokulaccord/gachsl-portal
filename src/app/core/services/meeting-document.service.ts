import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingDocumentService {

  private http = inject(HttpClient);

  private apiUrl =
    `${environment.apiUrl}/MeetingDocuments`;

  getByMeeting(meetingId: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/meeting/${meetingId}`);
  }

  upload(formData: FormData): Observable<any> {
    return this.http.post(
      this.apiUrl,
      formData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`);
  }
}