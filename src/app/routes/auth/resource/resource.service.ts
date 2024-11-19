import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OkItemService } from '@shared/services/ok-item.service';
import { NGXLogger } from 'ngx-logger';
import { api } from './resource.api';

@Injectable({
  providedIn: 'root',
})
export class ResourceService extends OkItemService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  list(param: any): Observable<any> {
    return this.http.post<any>(api.list, param).pipe(map((r: any) => r.data));
  }
}
