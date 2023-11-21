import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@shared/api/ok';
import { OkPaginatorService } from '@shared/services/ok-paginator.service';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { api } from './task.api';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends OkPaginatorService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  doClaim(params: ID): Observable<any> {
    return this.http.post<any>(api.claim, params.id);
  }

  doRelease(params: ID): Observable<any> {
    return this.http.post<any>(api.release, params.id);
  }

  doSuspend(params: ID): Observable<any> {
    return this.http.post<any>(api.suspend, params.id);
  }

  doResume(params: ID): Observable<any> {
    return this.http.post<any>(api.resume, params.id);
  }

  doStop(params: ID): Observable<any> {
    return this.http.post<any>(api.stop, params.id);
  }

  doStart(params: ID): Observable<any> {
    return this.http.post<any>(api.start, params.id);
  }

  doComplete(params: ID, data: any): Observable<any> {
    return this.http.post<any>(api.complete + params.id, data);
  }
}
