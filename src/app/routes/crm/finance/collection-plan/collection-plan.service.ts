import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OkPaginatorService } from '@shared/services/ok-paginator.service';
import { NGXLogger } from 'ngx-logger';
import { customerApi } from '../../customer/customer.api';

@Injectable({
  providedIn: 'root',
})
export class CollectionPlanService extends OkPaginatorService {
  constructor(protected logger: NGXLogger, protected http: HttpClient) {
    super(logger, http, customerApi);
  }
}
