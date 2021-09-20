import { ID, OkApi, OkResult } from '../api/ok';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OkPayload } from '@shared/api/ok';
import { map } from 'rxjs/operators';

export class OkItemService {
  constructor(protected logger: NGXLogger, protected http: HttpClient, protected api: OkApi) {}

  getDetail(id: string, params = {}): Observable<OkPayload> {
    return this.http
      .get<OkResult>(this.api.findById + id, { params })
      .pipe(map((r: OkResult) => r.payload));
  }
}
