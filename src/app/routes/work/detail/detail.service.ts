import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OkItemService } from '@shared/services/ok-item.service';
import { NGXLogger } from 'ngx-logger';

import { api } from '../appmgt/appmgt.api';
import { OkResult } from '@shared/api/ok';

@Injectable({
  providedIn: 'root',
})
export class DetailService extends OkItemService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  create(planId: number): Observable<string> {
    return this.http
      .post<OkResult<string>>(api.createOrder, planId)
      .pipe(map((r: OkResult<string>) => r.data));
  }

  close(no: string): Observable<string> {
    return this.http
      .post<OkResult<string>>(api.closeOrder, no)
      .pipe(map((r: OkResult<string>) => r.data));
  }
}
