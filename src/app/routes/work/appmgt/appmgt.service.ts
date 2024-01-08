import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OkItemService } from '@shared/services/ok-item.service';
import { NGXLogger } from 'ngx-logger';
import { ResList, SysWorkAppDTO, api } from './appmgt.api';
import { OkResult } from '@shared/api/ok';

@Injectable({
  providedIn: 'root',
})
export class AppmgtService extends OkItemService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  page(param: any): Observable<ResList<SysWorkAppDTO>> {
    return this.http
      .post<OkResult<ResList<SysWorkAppDTO>>>(api.page, param)
      .pipe(map((r: OkResult<ResList<SysWorkAppDTO>>) => r.data));
  }
}
