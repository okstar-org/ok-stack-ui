import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { WebsiteInfo } from 'app/routes/sys/personal/settings.api';

export enum BusDataType {
  WebsiteInfo,
}

export interface BusData {
  type: BusDataType;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class BusService {
  private data = new BehaviorSubject<any>({});

  constructor() {}

  getData() {
    return this.data.asObservable();
  }

  setData(type: BusDataType, data: any) {
    this.data.next({ type, data });
  }
}
