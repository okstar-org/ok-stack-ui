import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { OkPaginatorService } from '@shared/services/ok-paginator.service';
import { api } from './group.api';

@Injectable({
  providedIn: 'root',
})
export class GroupService extends OkPaginatorService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }
}
