import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { OkDetailService } from '@shared/services/ok-detail.service';

import { Observable, map } from 'rxjs';
import { ChatParticipant, api } from '../../room.api';

@Injectable({
  providedIn: 'root',
})
export class ContactService extends OkDetailService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }

  getParticipants(id: string, params = {}): Observable<ChatParticipant[]> {
    return this.http
      .get<ChatParticipant[]>(api.findParticipants + id, { params })
      .pipe(map((r: any) => r.data));
  }
}
