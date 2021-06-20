import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable, of } from 'rxjs';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
    // .pipe(e : HttpEvent<any> => {
    //     if(e instanceof HttpRequest){

    //     }
    //     return of(e);
    // });
  }
}
