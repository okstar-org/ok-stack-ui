import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID, OkPayload } from '@shared/api/ok';
import { OkPaginatorService } from '@shared/services/ok-paginator.service';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { api } from './task.api';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends OkPaginatorService {
  constructor(protected logger: NGXLogger, protected http: HttpClient) {
    super(logger, http, api);
  }

  doClaim(params: ID): Observable<OkPayload<any>> {
    return this.http.post<OkPayload<any>>(api.claim, params.id);
  }

  doRelease(params: ID): Observable<OkPayload<any>> {
    return this.http.post<OkPayload<any>>(api.release, params.id);
  }

  doSuspend(params: ID): Observable<OkPayload<any>> {
    return this.http.post<OkPayload<any>>(api.suspend, params.id);
  }

  doResume(params: ID): Observable<OkPayload<any>> {
    return this.http.post<OkPayload<any>>(api.resume, params.id);
  }

  doStop(params: ID): Observable<OkPayload<any>> {
    return this.http.post<OkPayload<any>>(api.stop, params.id);
  }

  doStart(params: ID): Observable<OkPayload<any>> {
    return this.http.post<OkPayload<any>>(api.start, params.id);
  }
}
