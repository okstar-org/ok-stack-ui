import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';
import { ChatRoom, api } from '../room.api';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  constructor(
    private logger: NGXLogger,
    private http: HttpClient
  ) {}

  getData(id: string, params = {}): Observable<ChatRoom> {
    return this.http.get<ChatRoom>(api.findById + id, { params }).pipe(map((r: any) => r.data));
  }

  // getGeneral(id: string, params = {}): Observable<ChatGeneral> {
  //   return this.http
  //     .get<ChatGeneral>(api.findGeneralInfo + id, { params })
  //     .pipe(map((r: any) => r.data));
  // }
}
