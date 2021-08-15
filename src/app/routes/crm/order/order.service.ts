import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OkPaginatorService } from '@shared/services/ok-paginator.service';
import { NGXLogger } from 'ngx-logger';
import { orderApi } from './opportunity.api';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends OkPaginatorService {
  constructor(protected logger: NGXLogger, protected http: HttpClient) {
    super(logger, http, orderApi);
  }
}
