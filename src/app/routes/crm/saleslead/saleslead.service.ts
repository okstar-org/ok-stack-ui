import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, share, switchMap, tap } from 'rxjs/operators';

export interface RepoSearchList {
  data: any;
  extra: any;
}

@Injectable()
export class SalesleadService {
  constructor(private logger: NGXLogger, private http: HttpClient) {}

  getData(params = {}): Observable<RepoSearchList> {
    this.logger.debug('getData', params);
    return this.http
      .get<RepoSearchList>('/api/portal/crm/saleslead/page', { params })
      .pipe(map((r: any) => r.payload));
  }
}
