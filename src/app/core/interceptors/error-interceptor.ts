import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

export enum STATUS {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private errorPages = [
    STATUS.UNAUTHORIZED,
    STATUS.FORBIDDEN,
    STATUS.NOT_FOUND,
    STATUS.INTERNAL_SERVER_ERROR,
  ];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<HttpErrorResponse>> {
    return next.handle(request).pipe(catchError(error => this.handleError(error)));
  }

  private handleError(error: any) {
    console.error(error);

    if (error.status === STATUS.UNAUTHORIZED) {
      this.router.navigateByUrl('/auth/login');
    }

    if (error.error) {
      if (error.error.msg) this.toastr.error(error.error.msg);
      return throwError(() => error);
    }

    if (error instanceof HttpErrorResponse) {
      if (error.status != 403 && error.statusText) {
        this.toastr.error(`${error.status} - ${error.statusText}`);
      }
      return throwError(() => error);
    }

    return of(error);
  }
}
