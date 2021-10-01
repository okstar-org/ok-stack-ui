import { AppInfo } from '../conn.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OkPayload, OkResult } from '@shared/api/ok';
import { OkItemService } from '@shared/services/ok-item.service';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { api } from './wx.api';
import { ConnType } from '../conn.api';

@Injectable({
  providedIn: 'root',
})
export class WxService extends OkItemService {
  constructor(protected logger: NGXLogger, protected http: HttpClient) {
    super(logger, http, api);
  }

  findByType(type: ConnType, params = {}): Observable<OkPayload> {
    return this.http
      .get<OkResult>(api.findByType + type.toString(), { params })
      .pipe(map((r: OkResult) => r.payload));
  }

  save(appInfo: AppInfo): Observable<OkPayload> {
    return super.saveItem(api.save, appInfo);
  }

  update(appInfo: AppInfo): Observable<OkPayload> {
    return super.updateItem(api.update, appInfo);
  }

  test(type: ConnType, params = {}): Observable<OkPayload> {
    return this.http
      .get<OkResult>(api.test + type.toString(), { params })
      .pipe(map((r: OkResult) => r.payload));
  }

  sync(type: ConnType, params = {}): Observable<OkPayload> {
    return this.http
      .put<OkResult>(api.sync + type.toString(), { params })
      .pipe(map((r: OkResult) => r.payload));
  }
}
