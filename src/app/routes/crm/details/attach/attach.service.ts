import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpClient } from '@angular/common/http';
import { OkDetailService } from '@shared/services/ok-detail.service';
import { api } from './attach.api';

@Injectable({
  providedIn: 'root',
})
export class AttachService extends OkDetailService {
  constructor(protected logger: NGXLogger, protected http: HttpClient) {
    super(logger, http, api);
  }
}