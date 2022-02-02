import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OkPayload } from '@shared/api/ok';
import { OkDetailService } from '@shared/services/ok-detail.service';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { api } from './model.api';

@Injectable({
  providedIn: 'root',
})
export class ModelService extends OkDetailService {
  constructor(protected logger: NGXLogger, protected http: HttpClient) {
    super(logger, http, api);
  }

  getConfig(): Observable<OkPayload<any>> {
    return this.getDetail('0');
  }
}
