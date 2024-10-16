import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OkItemService } from '@shared/services/ok-item.service';
import { NGXLogger } from 'ngx-logger';
import { api } from './settings.api';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService extends OkItemService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  load(params = {}): Observable<any> {
    return this.http.get<any>(api.page, params).pipe(map((r: any) => r.data));
  }

  update(params = {}): Observable<any> {
    return this.http.put<any>(api.update, params).pipe(map((r: any) => r.data));
  }
}
