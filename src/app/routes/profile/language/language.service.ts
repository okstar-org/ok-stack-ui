import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OkItemService } from '@shared/services/ok-item.service';
import { NGXLogger } from 'ngx-logger';
import { api, SysLocale } from './language.api';
import { OkResult } from '@shared/api/ok';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileLanguageService extends OkItemService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  languages(): Observable<SysLocale[]> {
    return this.http
      .get<OkResult<SysLocale[]>>(api.page) //
      .pipe(map((r: OkResult<SysLocale[]>) => r.data));
  }

  getLanguage(params = {}): Observable<any> {
    return this.http.get<any>(api.findById, params).pipe(map((r: any) => r.data));
  }

  updateLanguage(params = {}): Observable<any> {
    return this.http.put<any>(api.save, params).pipe(map((r: any) => r.data));
  }
}
