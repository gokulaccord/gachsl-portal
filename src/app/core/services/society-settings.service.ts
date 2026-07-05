import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocietySettings } from '../models/society-settings.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocietySettingsService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/SocietySettings`;

  get(): Observable<SocietySettings> {
    return this.http.get<SocietySettings>(this.apiUrl);
  }

  update(settings: SocietySettings): Observable<SocietySettings> {
    return this.http.put<SocietySettings>(this.apiUrl, settings);
  }
}