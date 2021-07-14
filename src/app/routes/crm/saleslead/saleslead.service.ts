import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CRM_API } from './../api-url';

export interface Payload {
  data: any;
  extra: any;
}

enum CustomerStateEnum {
  AlreadyPurchased,
  FollowingUp,
  OnTrial,
  PutItOnHold,
  ReadyToBuy,
  Understanding,
}

enum LeadStateEnum {
  InitialIntention,
  IsCustomer,
  NextInvite,
}

export interface DTO {
  isCreateFollowUpTask: boolean;
  customerName: string;
  customerState: CustomerStateEnum;
  avatar: string;
  contactName: string;
  faxPhone: string;
  landPhone: string;
  lastFollowUpTime: Date;
  leadFrom: string;
  leadState: string;
  mobilePhone: string;
  nextFollowUpTime: Date;
  note: string;
  owner: string;
  ownerName: string;
  unFollowUpDays: number;
  mail: any;
}

export interface Form extends DTO {
  //   mail: string | any;
}

export interface ID {
  id: string;
}

@Injectable()
export class SalesleadService {
  constructor(private logger: NGXLogger, private http: HttpClient) {}

  downLoadFile(data: any, type: string) {
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }

  getData(params = {}): Observable<Payload> {
    this.logger.debug('getData', params);
    return this.http
      .get<Payload>(CRM_API.saleslead.page, { params })
      .pipe(map((r: any) => r.payload));
  }

  getExport(params = {}) {
    this.logger.debug('getExport', params);
    return this.http
      .get(CRM_API.saleslead.export, { responseType: 'arraybuffer', params })
      .subscribe(r => this.downLoadFile(r, 'application/ms-excel'));
  }

  getParams(params = {}): Observable<Payload> {
    this.logger.debug('getParams', params);
    return this.http
      .get<Payload>(CRM_API.saleslead.params, { params })
      .pipe(map((r: any) => r.payload));
  }

  delete(params: ID): Observable<Payload> {
    this.logger.debug('delete', params);
    return this.http
      .delete<Payload>(CRM_API.saleslead.deleteById + params.id)
      .pipe(map((r: any) => r.payload));
  }

  top(params: ID): Observable<Payload> {
    this.logger.debug('top', params);
    return this.http
      .put<Payload>(CRM_API.saleslead.top, params.id, {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(map((r: any) => r.payload));
  }
}
