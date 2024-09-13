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

  saveStack(item: SysConfIntegrationStack): Observable<any> {
    return this.http.put<any>(api.putStack, item).pipe(map((r: any) => r.data));
  }

  testStack(item: SysConfIntegrationStack): Observable<any> {
    return this.http.post<any>(api.testStack, item).pipe(map((r: any) => r.data));
  }

  saveIm(item: SysConfIntegrationIm): Observable<any> {
    return this.http.put<any>(api.putIm, item).pipe(map((r: any) => r.data));
  }

  testIm(item: SysConfIntegrationIm): Observable<any> {
    return this.http.post<any>(api.testIm, item).pipe(map((r: any) => r.data));
  }

  saveKeycloak(item: SysConfIntegrationKeycloak): Observable<any> {
    return this.http.put<any>(api.putKeycloak, item).pipe(map((r: any) => r.data));
  }

  testKeycloak(item: SysConfIntegrationKeycloak): Observable<any> {
    return this.http.post<any>(api.testKeycloak, item).pipe(map((r: any) => r.data));
  }
}
