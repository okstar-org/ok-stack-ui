import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { OkResult } from '@shared/api/ok';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ParamsInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let { params } = req;

    params.keys().forEach(k => {
      console.log('params:', k, '-->', params.get(k));
      if (params.get(k) === null || params.get(k) === '' || typeof params.get(k) === 'undefined') {
        params = params.delete(k);
      }
    });

    return next
      .handle(
        req.clone({
          params,
        })
      )
      .pipe(
        map((response: any) => {
          const r: OkResult<any> = response.body;
          if (typeof r !== 'undefined' && r && typeof r.success !== 'undefined' && !r.success) {
            this.toastr.error(`${r.msg}`);
            return throwError(`${r.msg}`);
          }
          return response;
        })
      );
  }
}
