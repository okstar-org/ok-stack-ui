import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { api } from './profile.api';
import { OkDetailService } from '@shared/services/ok-detail.service';
import { Observable, map } from 'rxjs';
import { OkResult } from '@shared/api/ok';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends OkDetailService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }
  updatePassword(body = {}): Observable<boolean> {
    return this.http
      .put<OkResult<boolean>>(api.updatePassword, body)
      .pipe(map((r: OkResult<boolean>) => r.data));
  }
}
