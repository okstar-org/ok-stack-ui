import { OkItemService } from './../../../../shared/services/ok-item.service';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { api, Dept, User } from './dept.api';
import { OkPayload, OkResult } from '@shared/api/ok';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeptService extends OkItemService {
  constructor(protected logger: NGXLogger, protected http: HttpClient) {
    super(logger, http, api);
  }

  children(parentId: number, params = {}): Observable<OkPayload<Dept[]>> {
    return this.http
      .get<OkResult<Dept[]>>(api.children + parentId, { params })
      .pipe(map((r: OkResult<Dept[]>) => r.payload));
  }

  findByDept(deptId: number, params = {}): Observable<OkPayload<User[]>> {
    return this.http
      .get<OkResult<User[]>>(api.findByDept + deptId, { params })
      .pipe(map((r: OkResult<User[]>) => r.payload));
  }

  sync(params = {}): Observable<OkPayload<User[]>> {
    return this.http
      .put<OkResult<User[]>>(api.sync, { params })
      .pipe(map((r: OkResult<User[]>) => r.payload));
  }
}
