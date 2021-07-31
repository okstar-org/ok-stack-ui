import { customerApi } from './customer.api';
import { OkPaginatorService } from './../../../shared/services/ok-paginator.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends OkPaginatorService {
  constructor(protected logger: NGXLogger, protected http: HttpClient) {
    super(logger, http, customerApi);
  }
}
