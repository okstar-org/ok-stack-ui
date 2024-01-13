import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { api } from './pending.api';
import { OkResult } from '@shared/api/ok';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OkItemService } from '@shared/services/ok-item.service';
import { OrgStaffJoinReq, Staff } from '../staff.api';

@Injectable({
  providedIn: 'root',
})
export class PendingService extends OkItemService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  // page(): Observable<Staff[]> {
  //   return this.http.get<OkResult<Staff[]>>(api.page).pipe(map((r: OkResult<Staff[]>) => r.data));
  // }

  join(req: OrgStaffJoinReq): Observable<boolean> {
    return this.http
      .post<OkResult<boolean>>(api.join, req)
      .pipe(map((r: OkResult<boolean>) => r.data));
  }
}
