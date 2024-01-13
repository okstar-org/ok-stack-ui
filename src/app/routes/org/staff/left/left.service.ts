import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { api } from './left.api';
import { OkResult } from '@shared/api/ok';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OkItemService } from '@shared/services/ok-item.service';
import { Staff } from '../staff.api';

@Injectable({
  providedIn: 'root',
})
export class LeftService extends OkItemService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  // page(): Observable<Staff[]> {
  //   return this.http.get<OkResult<Staff[]>>(api.page).pipe(map((r: OkResult<Staff[]>) => r.data));
  // }
}
