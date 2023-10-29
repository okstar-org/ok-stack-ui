import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { CRM_API } from 'app/routes/crm/api-url';

export interface DialogAddItem {
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class AddService {
  constructor(
    private logger: NGXLogger,
    private http: HttpClient
  ) {}

  params(params = {}): Observable<DialogAddItem> {
    this.logger.debug('params', params);
    return this.http
      .get<DialogAddItem>(CRM_API.lead.params, params)
      .pipe(map((r: any) => r.payload));
  }

  save(params = {}): Observable<DialogAddItem> {
    this.logger.debug('save', params);
    return this.http
      .post<DialogAddItem>(CRM_API.lead.save, params)
      .pipe(map((r: any) => r.payload));
  }
}
