import { OkApi, OkResult, ResList } from '../api/ok';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class OkItemService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient,
    protected api: OkApi
  ) {}

  page(param: any): Observable<ResList<any>> {
    return this.http
      .post<OkResult<ResList<any>>>(this.api.page, param)
      .pipe(map((r: OkResult<ResList<any>>) => r.data));
  }

  getDetail(id: string | number, params = {}): Observable<any> {
    return this.http
      .get<OkResult<any>>(this.api.findById + (id ? '/' + id : ''), { params })
      .pipe(map((r: OkResult<any>) => r.data));
  }

  saveItem(url: string, params = {}): Observable<any> {
    return this.http.post<any>(url, params).pipe(map((r: any) => r.data));
  }

  updateItem(url: string, params = {}): Observable<any> {
    return this.http.put<any>(url, params).pipe(map((r: any) => r.data));
  }
}
