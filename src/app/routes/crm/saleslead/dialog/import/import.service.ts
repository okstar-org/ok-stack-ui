import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Payload } from './../../../../../core/authentication/interface';
import { CRM_API } from 'app/routes/crm/api-url';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImportService {
  constructor(private logger: NGXLogger, private http: HttpClient) {}

  importBegin(params = {}) {
    return this.http
      .get<Payload>(CRM_API.saleslead.importBegin, { params })
      .pipe(map((r: any) => r.payload));
  }

  importAdd(params = {}): Observable<Payload> {
    this.logger.debug('save', params);
    return this.http
      .post<Payload>(CRM_API.saleslead.importAdd, params)
      .pipe(map((r: any) => r.payload));
  }

  importCommit(params = {}) {
    return this.http
      .get<Payload>(CRM_API.saleslead.importCommit, { params })
      .pipe(map((r: any) => r.payload));
  }
}
