import { OkDetailService } from '@shared/services/ok-detail.service';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { api } from 'app/routes/chat/user/user.api';

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
}
