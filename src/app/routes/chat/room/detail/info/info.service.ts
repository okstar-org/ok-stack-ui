import { OkDetailService } from '@shared/services/ok-detail.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { ChatRoom, api } from '../../room.api';

@Injectable({
  providedIn: 'root',
})
export class InfoService extends OkDetailService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  getGeneral(id: string, params = {}): Observable<ChatRoom> {
    return this.http.get<ChatRoom>(api.findById + id, { params }).pipe(map((r: any) => r.data));
  }
}
