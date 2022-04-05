import { OkPageApi } from './../../../shared/api/ok';
import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { CRM_API, Payload } from '../api-url';
import { ID, OkPayload, OkResult } from '@shared/api/ok';
import { api, infoApi } from "./lead.api";
import { OkPaginatorService } from '@shared/services/ok-paginator.service';

@Injectable()
export class LeadService  extends OkPaginatorService {
  // constructor(private logger: NGXLogger, private http: HttpClient) {}

  constructor(protected logger: NGXLogger, protected http: HttpClient) {
    super(logger, http, api);
  }

  // downLoadFile(data: any, fileName: string, type: string) {
  //   try {
  //     const blob = new Blob([data], { type });

  //     const a = document.createElement('a');
  //     a.download = fileName;
  //     a.style.display = 'none';
  //     a.href = window.URL.createObjectURL(blob);

  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   } catch (error) {
  //     alert('您的浏览器不支持下载，请升级到最新的chrome浏览器！');
  //   }
  // }

  // getData(params = {}): Observable<OkPayload> {
  //   this.logger.debug('getData', params);
  //   return this.http.get<OkPayload>(api.page, { params }).pipe(map((r: any) => r.payload));
  // }

  getDetail(id: string, params = {}): Observable<OkPayload<any>> {
    return this.http
      .get<OkResult<any>>(infoApi.findById +'/'+ id, { params })
      .pipe(map((r: OkResult<any>) => r.payload));
  }

  // getExport(params = {}, fileName: string) {
  //   this.logger.debug('getExport', params);
  //   return this.http
  //     .get(CRM_API.lead.export, { responseType: 'arraybuffer', params })
  //     .subscribe(r => this.downLoadFile(r, fileName, 'application/ms-excel'));
  // }

  getForm(params = {}): Observable<OkPayload<any>> {
    return this.http.get<OkPayload<any>>(api.form, { params }).pipe(map((r: any) => r.payload));
  }

  // getParams(params = {}): Observable<Payload> {
  //   this.logger.debug('getParams', params);
  //   return this.http.get<Payload>(CRM_API.lead.params, { params }).pipe(map((r: any) => r.payload));
  // }

  // delete(params: ID): Observable<Payload> {
  //   this.logger.debug('delete', params);
  //   return this.http
  //     .delete<Payload>(CRM_API.lead.deleteById + params.id)
  //     .pipe(map((r: any) => r.payload));
  // }

  // top(params: ID): Observable<Payload> {
  //   this.logger.debug('top', params);
  //   return this.http
  //     .put<Payload>(CRM_API.lead.top, params.id, {
  //       headers: { 'content-type': 'application/json' },
  //     })
  //     .pipe(map((r: any) => r.payload));
  // }
}
