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
        switchMap(() => (this.check() ? this.userReq$ : of(guest))),
        map((r: R) => this.payload(r))
      )
      .subscribe(user => this.user$.next(Object.assign({}, guest, user)));

    this.token
      .refresh()
      .pipe(switchMap(() => this.refresh()))
      .subscribe();
  }

  check() {
    this.logger.debug('check...');
    return this.token.valid();
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

  payload(r: R): Token {
    this.logger.debug('r', r);
    return r.payload.data as Token;
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
