import { OkPaginatorService } from '@shared/services/ok-paginator.service';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { customerApi } from '../../customer/customer.api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService extends OkPaginatorService {
  constructor(protected logger: NGXLogger, protected http: HttpClient) {
    super(logger, http, customerApi);
  }
}
