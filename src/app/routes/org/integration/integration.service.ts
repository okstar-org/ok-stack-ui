import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OkItemService } from '@shared/services/ok-item.service';
import { NGXLogger } from 'ngx-logger';
import { api } from './integration.api';

@Injectable({
  providedIn: 'root',
})
export class IntegrationService extends OkItemService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  test(type: string, params = {}): Observable<any> {
    return this.http.post<any>(api.test + '/' + type, params).pipe(map((r: any) => r.data));
  }

  sync(type: string, params = {}): Observable<any> {
    return this.http.put<any>(api.sync + '/' + type, params).pipe(map((r: any) => r.data));
  }
}
