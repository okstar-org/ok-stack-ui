import { ID, OkApi, OkResult } from './../api/ok';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OkPayload } from '@shared/api/ok';
import { map } from 'rxjs/operators';

export class OkDetailService {
  constructor(protected logger: NGXLogger, protected http: HttpClient, protected api: OkApi) {}

  getDetail(id: string, params = {}): Observable<OkPayload<any>> {
    return this.http
      .get<OkResult<any>>(this.api.findById +'/'+ id, { params })
      .pipe(map((r: OkResult<any>) => r.payload));
  }

  getPage(params = {}): Observable<OkPayload<any>> {
    const url = this.api.page;

    this.logger.debug(url, params);

    return this.http.get<OkResult<any>>(url, { params }).pipe(map((r: OkResult<any>) => r.payload));
  }
}
