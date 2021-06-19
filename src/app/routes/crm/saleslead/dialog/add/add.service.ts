import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, share, switchMap, tap } from 'rxjs/operators';

export interface DialogAddItem {}

@Injectable({
  providedIn: 'root',
})
export class AddService {
  constructor(private logger: NGXLogger, private http: HttpClient) {}

  postData(params = {}): Observable<DialogAddItem> {
    this.logger.debug('post', params);
    return this.http
      .post<DialogAddItem>('/api/portal/crm/saleslead/save', params)
      .pipe(map((r: any) => r.payload));
  }
}
