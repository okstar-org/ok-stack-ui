import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(protected http: HttpClient) {}

  updateNickname(params = {}): Observable<any> {
    return this.http.put<any>('/api/sys/account/nickname', params).pipe(map((r: any) => r.data));
  }
}
