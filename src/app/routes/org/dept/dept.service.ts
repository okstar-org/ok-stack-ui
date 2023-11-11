import { OkItemService } from './../../../shared/services/ok-item.service';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { api, Dept, Org, User } from './dept.api';
import { OkPayload, OkResult } from '@shared/api/ok';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeptService extends OkItemService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  getCurrentOrg(): Observable<Org> {
    return this.http.get<OkResult<Org>>(api.getCurrentOrg).pipe(map((r: OkResult<Org>) => r.data));
  }

  getChildren(): Observable<Dept[]> {
    return this.http
      .get<OkResult<Dept[]>>(api.getChildren)
      .pipe(map((r: OkResult<Dept[]>) => r.data));
  }

  children(parentId: number, params = {}): Observable<Dept[]> {
    return this.http
      .get<OkResult<Dept[]>>(api.children + parentId, { params })
      .pipe(map((r: OkResult<Dept[]>) => r.data));
  }

  findUserByDept(id: number, params = {}): Observable<OkPayload<User[]>> {
    return this.http
      .get<OkResult<User[]>>(api.findUserByDept + id, { params })
      .pipe(map((r: OkResult<User[]>) => r.data));
  }

  deleteById(id: number, params = {}): Observable<OkPayload<User[]>> {
    return this.http
      .delete<OkResult<User[]>>(api.deleteById + id, { params })
      .pipe(map((r: OkResult<User[]>) => r.data));
  }

  sync(params = {}): Observable<OkPayload<User[]>> {
    return this.http
      .put<OkResult<User[]>>(api.sync, { params })
      .pipe(map((r: OkResult<User[]>) => r.data));
  }

  syncUser(params = {}): Observable<OkPayload<User[]>> {
    return this.http
      .put<OkResult<User[]>>(api.syncUser, { params })
      .pipe(map((r: OkResult<User[]>) => r.data));
  }
}
