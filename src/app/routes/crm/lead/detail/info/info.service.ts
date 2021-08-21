import { infoApi } from 'app/routes/crm/lead/lead.api';
import { OkDetailService } from '@shared/services/ok-detail.service';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InfoService extends OkDetailService {
  constructor(protected logger: NGXLogger, protected http: HttpClient) {
    super(logger, http, infoApi);
  }
}
