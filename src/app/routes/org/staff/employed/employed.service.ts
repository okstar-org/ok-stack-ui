import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { OkResult } from '@shared/api/ok';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OkItemService } from '@shared/services/ok-item.service';
import { api } from './employed.api';

@Injectable({
  providedIn: 'root',
})
export class EmployedService extends OkItemService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  leavel(id: number): Observable<boolean> {
    return this.http
      .post<OkResult<boolean>>(api.leave, id)
      .pipe(map((r: OkResult<boolean>) => r.data));
  }
}
