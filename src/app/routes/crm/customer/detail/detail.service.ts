import { OkApi } from './../../../../shared/api/ok';
import { map } from 'rxjs/operators';
import { CRM_API, Payload } from 'app/routes/crm/api-url';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';
import { api } from '../customer.api';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  constructor(private logger: NGXLogger, private http: HttpClient) {}

  getData(id: string, params = {}): Observable<Payload> {
    this.logger.debug('getData', params);
    return this.http.get<Payload>(api.findById + id, { params }).pipe(map((r: any) => r.payload));
  }
}