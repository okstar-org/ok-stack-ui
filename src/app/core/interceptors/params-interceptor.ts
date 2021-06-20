import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

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

    return next.handle(
      req.clone({
        params,
      })
    );
  }
}
