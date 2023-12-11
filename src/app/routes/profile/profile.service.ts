import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { api } from './profile.api';
import { OkDetailService } from '@shared/services/ok-detail.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends OkDetailService {
  constructor(
    protected logger: NGXLogger,
    protected http: HttpClient
  ) {
    super(logger, http, api);
  }
}
