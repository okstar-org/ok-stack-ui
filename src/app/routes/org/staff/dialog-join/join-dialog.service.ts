import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OrgPost } from '../../dept/dept.api';
import { api } from '../staff.api';
import { OkResult } from '@shared/api/ok';

@Injectable({
  providedIn: 'root',
})
export class JoinDialogService {
  constructor(protected http: HttpClient) {}

  listPost(params = {}): Observable<OrgPost[]> {
    return this.http
      .get<OkResult<OrgPost[]>>(api.listPost, { params })
      .pipe(map((r: OkResult<OrgPost[]>) => r.data));
  }
}
