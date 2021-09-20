import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OkPayload, OkResult } from '@shared/api/ok';
import { OkItemService } from '@shared/services/ok-item.service';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConnType } from '../conn.api';
import { api } from './fs.api';

@Injectable({
  providedIn: 'root',
})
export class FsService extends OkItemService {
  constructor(protected logger: NGXLogger, protected http: HttpClient) {
    super(logger, http, api);
  }

  findByType(type: ConnType, params = {}): Observable<OkPayload> {
    return this.http
      .get<OkResult>(this.api.findByType + type.toString(), { params })
      .pipe(map((r: OkResult) => r.payload));
  }
}
