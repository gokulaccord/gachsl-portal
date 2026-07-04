import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  post(url: string, body: any) {
    return this.http.post(`${this.baseUrl}/${url}`, body);
  }

  get(url: string) {
    return this.http.get(`${this.baseUrl}/${url}`);
  }
}