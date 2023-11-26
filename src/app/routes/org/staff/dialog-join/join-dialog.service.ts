import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Dept } from '../../dept/dept.api';
import { StaffJoinOpt, api } from '../staff.api';
import { OkResult } from '@shared/api/ok';

@Injectable({
  providedIn: 'root',
})
export class JoinDialogService {
  constructor(protected http: HttpClient) {}

  listPost(params = {}): Observable<Dept[]> {
    return this.http
      .get<OkResult<Dept[]>>(api.listPost, { params })
      .pipe(map((r: OkResult<Dept[]>) => r.data));
  }
}
