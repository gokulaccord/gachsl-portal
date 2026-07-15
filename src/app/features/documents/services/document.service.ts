import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = 'http://localhost:5278/api/Documents';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getById(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  delete(id:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  create(formData: FormData) {
  return this.http.post<any>(
    this.apiUrl,
    formData
  );
}

  update(id:number,data:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`,data);
  }
  getCategories() {

  return this.http.get<any>(
    'http://localhost:5278/api/DocumentCategories'
  );

}
download(id: number) {
  return this.http.get(
    `http://localhost:5278/api/Documents/download/${id}`,
    {
      responseType: 'blob'
    }
  );
}
}