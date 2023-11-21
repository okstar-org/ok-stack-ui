import { ID, OkApi, OkResult } from './../api/ok';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class OkDetailService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient,
    protected api: OkApi
  ) {}

  getDetail(id: string, params = {}): Observable<any> {
    return this.http
      .get<OkResult<any>>(this.api.findById + '/' + id, { params })
      .pipe(map((r: OkResult<any>) => r.data));
  }

  getPage(params = {}): Observable<any> {
    const url = this.api.page;
    return this.http.get<OkResult<any>>(url, { params }).pipe(map((r: OkResult<any>) => r.data));
  }
}
