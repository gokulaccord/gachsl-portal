import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { ApiResponse } from '../models/api-response.model';
import { JwtHelper } from '../helpers/jwt.helper';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

private apiUrl = `${environment.apiUrl}/Auth`;

constructor(
  private http: HttpClient,
  private router: Router
) {}

  login(request: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(
      `${this.apiUrl}/login`,
      request
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
  }

 isLoggedIn(): boolean {
  return this.isTokenValid();
}
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
  getUser(): any {
  const token = this.getToken();
  if (!token) return null;

  return JwtHelper.decode(token);
}
isTokenValid(): boolean {

  const token = this.getToken();

  console.log('========== TOKEN VALIDATION ==========');
  console.log('Token exists:', !!token);

  if (!token) {
    return false;
  }

  const payload = JwtHelper.decode(token);

  console.log('Decoded Payload:', payload);

  if (!payload) {
    console.log('Decode returned NULL');
    return false;
  }

  console.log('EXP:', payload.exp);

  const now = Math.floor(Date.now() / 1000);

  console.log('NOW:', now);

  console.log('EXP > NOW ?', payload.exp! > now);

  return payload.exp! > now;
}
}