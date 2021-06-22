import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ParamsInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let { params } = req;

    params.keys().forEach(k => {
      if (!params.get(k)) {
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
        map((r: any) => {
          console.log('response', r);
          // return  r.body.header ? r.body.payload.data : r.body
          return r;
        })
      );
  }
}
