import { ID, OkApi, OkResult } from './../api/ok';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OkPayload } from '@shared/api/ok';
import { map } from 'rxjs/operators';
import { leadApi } from 'app/routes/crm/saleslead/lead.api';

export class OkDetailService {
  constructor(protected logger: NGXLogger, protected http: HttpClient, protected api: OkApi) {}

  getDetail(id: string, params = {}): Observable<OkPayload> {
    this.logger.info(leadApi);
    return this.http
      .get<OkResult>(leadApi.detail.info.findById + id, { params })
      .pipe(map((r: OkResult) => r.payload));
  }

  getPage(params = {}): Observable<OkPayload> {
    const url = leadApi.detail.followup.page;
    this.logger.debug(url, params);
    return this.http.get<OkResult>(url, { params }).pipe(map((r: OkResult) => r.payload));
  }
}
