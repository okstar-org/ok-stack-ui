import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { R, Token, User } from './interface';
import { guest } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User>(guest);

  private userReq$ = this.http.get<R>('/api/portal/sys/me');

  constructor(private logger: NGXLogger, private http: HttpClient, private token: TokenService) {
    this.token
      .change()
      .pipe(
        switchMap(() =>
          this.check() ? this.userReq$.pipe(map((r: R) => this.payload(r))) : of(guest)
        )
      )
      .subscribe(user => this.user$.next(Object.assign({}, guest, user)));

    this.token
      .refresh()
      .pipe(switchMap(() => this.refresh()))
      .subscribe();
  }

  check() {
    this.logger.debug('check...');
    const v = this.token.valid();
    this.logger.debug('check...', v);
    return v;
  }

  login(email: string, password: string, rememberMe = false) {
    return this.http
      .post<R>('/api/portal/sys/passport/login', {
        account: email,
        password,
        grantType: 'password',
        remember_me: rememberMe,
      })
      .pipe(
        map((r: R) => this.payload(r)),
        tap(token => this.token.set(token)),
        map(() => this.check())
      );
  }

  payload(r: R) {
    this.logger.debug('r', r);
    return r.payload.data;
  }

  refresh() {
    return this.http.post<R>('/api/portal/sys/passport/refresh', {}).pipe(
      map((r: R) => this.payload(r)),
      tap(token => this.token.set(token, true)),
      map(() => this.check())
    );
  }

  logout() {
    return this.http.post('/api/portal/sys/passport/logout', {}).pipe(
      tap(() => this.token.clear()),
      map(() => !this.check())
    );
  }

  user() {
    return this.user$.pipe(share());
  }
}
