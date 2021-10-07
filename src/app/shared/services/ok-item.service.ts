import { ID, OkApi, OkResult } from '../api/ok';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OkPayload } from '@shared/api/ok';
import { map } from 'rxjs/operators';

export class OkItemService {
  constructor(protected logger: NGXLogger, protected http: HttpClient, protected api: OkApi) {}

  getDetail(url: string, params = {}): Observable<OkPayload<any>> {
    return this.http.get<OkResult<any>>(url, { params }).pipe(map((r: OkResult<any>) => r.payload));
  }

  saveItem(url: string, params = {}): Observable<any> {
    return this.http.post<any>(url, params).pipe(map((r: any) => r.payload));
  }

  updateItem(url: string, params = {}): Observable<any> {
    return this.http.put<any>(url, params).pipe(map((r: any) => r.payload));
  }
}
