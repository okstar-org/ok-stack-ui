import { OkApi } from '@shared/api/ok';
import { map } from 'rxjs/operators';
import { User } from 'app/routes/chat/api-url';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';
import { api } from '../user.api';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  constructor(
    private logger: NGXLogger,
    private http: HttpClient
  ) {}

  getData(id: string, params = {}): Observable<User> {
    this.logger.debug('getData', params);
    return this.http.get<User>(api.findById + id, { params }).pipe(map((r: any) => r.data));
  }
}
