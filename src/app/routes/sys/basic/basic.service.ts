import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OkItemService } from '@shared/services/ok-item.service';
import { NGXLogger } from 'ngx-logger';
import { SysSetLocale, api } from './basic.api';
import { OkResult } from '@shared/api/ok';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BasicService extends OkItemService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  findLocales(): Observable<SysSetLocale[]> {
    return this.http
      .get<OkResult<SysSetLocale[]>>(api.findLocales) //
      .pipe(map((r: OkResult<SysSetLocale[]>) => r.data));
  }

  getPersonal(params = {}): Observable<any> {
    return this.http.get<any>(api.personal, params).pipe(map((r: any) => r.data));
  }

  updatePersonal(params = {}): Observable<any> {
    return this.http.put<any>(api.personal, params).pipe(map((r: any) => r.data));
  }
}