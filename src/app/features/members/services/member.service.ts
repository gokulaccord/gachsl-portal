import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response.model';
import { Member } from '../models/member.model';
import { CreateMember } from '../models/create-member.model';
import { MemberLookup } from '../../../core/models/member-lookup.model';
import { DocumentLookup } from '../../../core/models/document-lookup.model';
@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private apiUrl = `${environment.apiUrl}/Members`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<Member[]>> {
    return this.http.get<ApiResponse<Member[]>>(this.apiUrl);
  }

  getById(id: number): Observable<ApiResponse<Member>> {
    return this.http.get<ApiResponse<Member>>(`${this.apiUrl}/${id}`);
  }

 create(member: CreateMember) {
  return this.http.post<ApiResponse<any>>(this.apiUrl, member);
}
  update(id: number, member: Member): Observable<ApiResponse<Member>> {
    return this.http.put<ApiResponse<Member>>(`${this.apiUrl}/${id}`, member);
  }


  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
getAvailableMembers(consentId?: number) {

  let url = `${this.apiUrl}/available`;

  if (consentId) {
    url += `?consentId=${consentId}`;
  }

  return this.http.get<MemberLookup[]>(url);
}
getLookup(): Observable<DocumentLookup[]> {

  return this.http.get<DocumentLookup[]>(
    `${this.apiUrl}/lookup`
  );

}
}