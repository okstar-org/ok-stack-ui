import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { OkResult } from '@shared/api/ok';

@Injectable({
  providedIn: 'root',
})
export class PreloaderService {
  private selector = 'globalLoader';

  constructor(protected http: HttpClient) {}

  private getElement() {
    return document.getElementById(this.selector);
  }

  hide() {
    const el = this.getElement();
    if (el) {
      el.addEventListener('transitionend', () => {
        el.className = 'global-loader-hidden';
      });

      if (!el.className.includes('global-loader-hidden')) {
        el.className += ' global-loader-fade-in';
      }
    }
  }

  loadWebsite() {
    return this.http
      .get<OkResult<any>>('/api/sys/open/website')
      .pipe(map((r: OkResult<any>) => r.data));
  }
}
