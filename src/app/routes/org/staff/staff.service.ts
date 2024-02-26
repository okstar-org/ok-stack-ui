import { OkItemService } from '../../../shared/services/ok-item.service';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { api, OrgStaffReq, Staff } from './staff.api';
import { OkResult, ResList } from '@shared/api/ok';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffService extends OkItemService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  save(req: OrgStaffReq): Observable<boolean> {
    return this.http
      .post<OkResult<boolean>>(api.save, req)
      .pipe(map((r: OkResult<boolean>) => r.data));
  }

  children(parentId: number, params = {}): Observable<Staff[]> {
    return this.http
      .get<OkResult<Staff[]>>(api.children + parentId, { params })
      .pipe(map((r: OkResult<Staff[]>) => r.data));
  }

  getChildren(): Observable<Staff[]> {
    return this.http
      .get<OkResult<Staff[]>>(api.getChildren)
      .pipe(map((r: OkResult<Staff[]>) => r.data));
  }

  deleteById(id: number, params = {}): Observable<Staff[]> {
    return this.http
      .delete<OkResult<Staff[]>>(api.deleteById + id, { params })
      .pipe(map((r: OkResult<Staff[]>) => r.data));
  }

  sync(params = {}): Observable<Staff[]> {
    return this.http
      .put<OkResult<Staff[]>>(api.sync, { params })
      .pipe(map((r: OkResult<Staff[]>) => r.data));
  }

  count(params = {}): Observable<number> {
    return this.http
      .get<OkResult<number>>(api.count, { params })
      .pipe(map((r: OkResult<number>) => r.data));
  }

  countPost(params = {}): Observable<number> {
    return this.http
      .get<OkResult<number>>(api.countPost, { params })
      .pipe(map((r: OkResult<number>) => r.data));
  }
}
