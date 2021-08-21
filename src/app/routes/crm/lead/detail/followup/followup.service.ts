import { OkPaginatorService } from '@shared/services/ok-paginator.service';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { followApi } from '../../lead.api';
import { HttpClient } from '@angular/common/http';
import { OkDetailService } from '@shared/services/ok-detail.service';

@Injectable({
  providedIn: 'root',
})
export class FollowupService extends OkDetailService {
  constructor(protected logger: NGXLogger, protected http: HttpClient) {
    super(logger, http, followApi);
  }
}
