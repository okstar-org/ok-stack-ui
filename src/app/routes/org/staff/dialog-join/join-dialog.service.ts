import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OrgDept } from '../../dept/dept.api';
import { StaffJoinOpt, api } from '../staff.api';
import { OkResult } from '@shared/api/ok';

@Injectable({
  providedIn: 'root',
})
export class JoinDialogService {
  constructor(protected http: HttpClient) {}

  listPost(params = {}): Observable<OrgDept[]> {
    return this.http
      .get<OkResult<OrgDept[]>>(api.listPost, { params })
      .pipe(map((r: OkResult<OrgDept[]>) => r.data));
  }
}
