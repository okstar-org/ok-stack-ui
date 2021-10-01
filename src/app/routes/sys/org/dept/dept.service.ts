import { OkItemService } from './../../../../shared/services/ok-item.service';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { api } from './dept.api';
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

  children(parentId: number, params = {}): Observable<OkPayload> {
    return this.http
      .get<OkResult>(api.children + parentId, { params })
      .pipe(map((r: OkResult) => r.payload));
  }
}
