import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OkItemService } from '@shared/services/ok-item.service';
import { NGXLogger } from 'ngx-logger';
import {
  api,
  SysConfIntegrationIm,
  SysConfIntegrationKeycloak,
  SysConfIntegrationStack,
} from './integration.api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  saveConf(item: any, type: string): Observable<any> {
    return this.http.put<any>(api.putConf + '/' + type, item).pipe(map((r: any) => r.data));
  }

  testConf(item: any, type: string): Observable<any> {
    return this.http.post<any>(api.testConf + '/' + type, item).pipe(map((r: any) => r.data));
  }
}
