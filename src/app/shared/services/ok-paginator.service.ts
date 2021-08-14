import { ID, OkApi, OkPageApi, OkResult } from './../api/ok';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OkPayload } from '@shared/api/ok';
import { map } from 'rxjs/operators';

export class OkPaginatorService {
  constructor(protected logger: NGXLogger, protected http: HttpClient, protected api: OkPageApi) {}

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

  getPage(params = {}): Observable<OkPayload> {
    this.logger.debug(this.api.page, params);
    return this.http.get<OkResult>(this.api.page, { params }).pipe(map((r: OkResult) => r.payload));
  }

  getExport(params = {}, fileName: string) {
    this.logger.debug(this.api.export, params);
    return this.http
      .get(this.api.export, { responseType: 'arraybuffer', params })
      .subscribe(r => this.downLoadFile(r, fileName, 'application/ms-excel'));
  }

  getParams(params = {}): Observable<OkPayload> {
    this.logger.debug(this.api.params, params);
    return this.http.get<OkPayload>(this.api.params, { params }).pipe(map((r: any) => r.OkPayload));
  }

  delete(params: ID): Observable<OkPayload> {
    this.logger.debug(this.api.deleteById, params);
    return this.http
      .delete<OkPayload>(this.api.deleteById + params.id)
      .pipe(map((r: any) => r.OkPayload));
  }

  top(params: ID): Observable<OkPayload> {
    this.logger.debug(this.api.top, params);
    return this.http
      .put<OkPayload>(this.api.top, params.id, {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(map((r: any) => r.OkPayload));
  }
}
