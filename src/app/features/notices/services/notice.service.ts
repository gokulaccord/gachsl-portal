import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notice } from '../models/notice';


@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private apiUrl = 'http://localhost:5278/api/Notices';


  constructor(
    private http: HttpClient
  ) { }


  getAll(): Observable<any> {

    return this.http.get<any>(this.apiUrl);

  }


  create(notice: Notice): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      notice
    );

  }


  delete(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }
getById(id:number): Observable<any> {

  return this.http.get<any>(
    `${this.apiUrl}/${id}`
  );

}


update(id:number, notice:Notice): Observable<any> {

  return this.http.put<any>(
    `${this.apiUrl}/${id}`,
    notice
  );

}
}