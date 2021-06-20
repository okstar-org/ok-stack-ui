import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CRM_API } from './../api-url';

export interface RepoSearchList {
  data: any;
  extra: any;
}

export interface ID {
  id: number;
}

@Injectable()
export class SalesleadService {
  constructor(private logger: NGXLogger, private http: HttpClient) {}

  getData(params = {}): Observable<RepoSearchList> {
    this.logger.debug('getData', params);
    return this.http
      .get<RepoSearchList>(CRM_API.saleslead.page, { params })
      .pipe(map((r: any) => r.payload));
  }

  delete(params: ID): Observable<RepoSearchList> {
    this.logger.debug('delete', params);
    return this.http
      .delete<RepoSearchList>(CRM_API.saleslead.deleteById + params.id)
      .pipe(map((r: any) => r.payload));
  }
}
