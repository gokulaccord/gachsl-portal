import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response.model';

import { Consent } from '../models/consent.model';
import { CreateConsent } from '../models/create-consent.model';
import { UpdateConsent } from '../models/update-consent.model';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {

  private apiUrl = `${environment.apiUrl}/Consent`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<Consent[]>> {
    return this.http.get<ApiResponse<Consent[]>>(this.apiUrl);
  }

  getById(id: number): Observable<ApiResponse<Consent>> {
    return this.http.get<ApiResponse<Consent>>(`${this.apiUrl}/${id}`);
  }

  create(consent: CreateConsent): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, consent);
  }

  update(id: number, consent: UpdateConsent): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/${id}`, consent);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}