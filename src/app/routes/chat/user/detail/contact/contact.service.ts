import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { OkDetailService } from '@shared/services/ok-detail.service';
import { ChatRostItem, api } from '../../user.api';
import { Observable, map } from 'rxjs';

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

  getRoster(id: string, params = {}): Observable<ChatRostItem[]> {
    return this.http
      .get<ChatRostItem[]>(api.findContacts + id, { params })
      .pipe(map((r: any) => r.data));
  }
}
