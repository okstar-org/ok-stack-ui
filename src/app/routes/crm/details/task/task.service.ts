import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OkDetailService } from '@shared/services/ok-detail.service';
import { NGXLogger } from 'ngx-logger';
import { taskApi } from '../../lead/lead.api';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends OkDetailService {
  constructor(protected logger: NGXLogger, protected http: HttpClient) {
    super(logger, http, taskApi);
  }
}
