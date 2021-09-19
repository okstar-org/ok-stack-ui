import { OkPaginatorService } from '@shared/services/ok-paginator.service';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { api } from './invoice.api';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService extends OkPaginatorService {
  constructor(protected logger: NGXLogger, protected http: HttpClient) {
    super(logger, http, api);
  }
}