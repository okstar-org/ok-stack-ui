import { OkItemService } from '../../../shared/services/ok-item.service';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { api, Staff, User } from './staff.api';
import { OkResult } from '@shared/api/ok';
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

  findUserByDept(id: number, params = {}): Observable<User[]> {
    return this.http
      .get<OkResult<User[]>>(api.findUserByDept + id, { params })
      .pipe(map((r: OkResult<User[]>) => r.data));
  }

  deleteById(id: number, params = {}): Observable<User[]> {
    return this.http
      .delete<OkResult<User[]>>(api.deleteById + id, { params })
      .pipe(map((r: OkResult<User[]>) => r.data));
  }

  sync(params = {}): Observable<User[]> {
    return this.http
      .put<OkResult<User[]>>(api.sync, { params })
      .pipe(map((r: OkResult<User[]>) => r.data));
  }

  syncUser(params = {}): Observable<User[]> {
    return this.http
      .put<OkResult<User[]>>(api.syncUser, { params })
      .pipe(map((r: OkResult<User[]>) => r.data));
  }
}
