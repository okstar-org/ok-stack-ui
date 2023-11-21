import { AppInfo } from '../conn.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OkResult } from '@shared/api/ok';
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
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  findByType(type: ConnType, params = {}): Observable<any> {
    return this.http
      .get<OkResult<any>>(api.findByType + type.toString(), { params })
      .pipe(map((r: OkResult<any>) => r.data));
  }

  save(appInfo: AppInfo): Observable<any> {
    return super.saveItem(api.save, appInfo);
  }

  update(appInfo: AppInfo): Observable<any> {
    return super.updateItem(api.update, appInfo);
  }

  test(type: ConnType, params = {}): Observable<any> {
    return this.http
      .get<OkResult<any>>(api.test + type.toString(), { params })
      .pipe(map((r: OkResult<any>) => r.data));
  }

  sync(type: ConnType, params = {}): Observable<any> {
    return this.http
      .put<OkResult<any>>(api.sync + type.toString(), { params })
      .pipe(map((r: OkResult<any>) => r.data));
  }

  syncUser(type: ConnType, params = {}): Observable<any> {
    return this.http
      .put<OkResult<any>>(api.syncUser + type.toString(), { params })
      .pipe(map((r: OkResult<any>) => r.data));
  }
}
