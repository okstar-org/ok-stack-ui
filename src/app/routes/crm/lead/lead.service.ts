import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CRM_API, Payload } from '../api-url';
import { ID } from '@shared/api/ok';

@Injectable()
export class LeadService {
  constructor(private logger: NGXLogger, private http: HttpClient) {}

  downLoadFile(data: any, fileName: string, type: string) {
    try {
      const blob = new Blob([data], { type });

      const a = document.createElement('a');
      a.download = fileName;
      a.style.display = 'none';
      a.href = window.URL.createObjectURL(blob);

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      alert('您的浏览器不支持下载，请升级到最新的chrome浏览器！');
    }
  }

  getData(params = {}): Observable<Payload> {
    this.logger.debug('getData', params);
    return this.http.get<Payload>(CRM_API.lead.page, { params }).pipe(map((r: any) => r.payload));
  }

  getExport(params = {}, fileName: string) {
    this.logger.debug('getExport', params);
    return this.http
      .get(CRM_API.lead.export, { responseType: 'arraybuffer', params })
      .subscribe(r => this.downLoadFile(r, fileName, 'application/ms-excel'));
  }

  getParams(params = {}): Observable<Payload> {
    this.logger.debug('getParams', params);
    return this.http.get<Payload>(CRM_API.lead.params, { params }).pipe(map((r: any) => r.payload));
  }

  delete(params: ID): Observable<Payload> {
    this.logger.debug('delete', params);
    return this.http
      .delete<Payload>(CRM_API.lead.deleteById + params.id)
      .pipe(map((r: any) => r.payload));
  }

  top(params: ID): Observable<Payload> {
    this.logger.debug('top', params);
    return this.http
      .put<Payload>(CRM_API.lead.top, params.id, {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(map((r: any) => r.payload));
  }
}
