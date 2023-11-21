import { OkItemService } from '@shared/services/ok-item.service';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { api, Org } from './org.api';
import { OkResult } from '@shared/api/ok';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrgService extends OkItemService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  getCurrentOrg(): Observable<Org> {
    return this.http.get<OkResult<Org>>(api.getCurrentOrg).pipe(map((r: OkResult<Org>) => r.data));
  }
}
