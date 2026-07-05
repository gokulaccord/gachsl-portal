import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response.model';
import { SocietySettings } from '../models/society-settings.model';

@Injectable({
  providedIn: 'root'
})
export class SocietySettingsService {

  private apiUrl = `${environment.apiUrl}/SocietySettings`;

  constructor(private http: HttpClient) { }

  get(): Observable<ApiResponse<SocietySettings>> {
    return this.http.get<ApiResponse<SocietySettings>>(this.apiUrl);
  }

  update(settings: SocietySettings): Observable<ApiResponse<SocietySettings>> {
    return this.http.put<ApiResponse<SocietySettings>>(this.apiUrl, settings);
  }
}