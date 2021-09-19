import { OkPaginatorService } from '@shared/services/ok-paginator.service';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { opportunityApi } from './opportunity.api';

@Injectable({
  providedIn: 'root',
})
export class OpportunityService extends OkPaginatorService {
  constructor(protected logger: NGXLogger, protected http: HttpClient) {
    super(logger, http, opportunityApi);
  }
}