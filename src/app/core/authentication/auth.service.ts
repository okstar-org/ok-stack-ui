import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { R, Token, User, SignUpForm } from './interface';
import { guest } from './user';
import { SimpleToken } from './token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User>(guest);

  private userReq$ = this.http.get<R>('/api/portal/sys/me');

  constructor(
    private logger: NGXLogger,
    private http: HttpClient,
    private token: TokenService
  ) {
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
    // this.logger.debug('check...');
    const v = this.token.valid();
    // this.logger.debug('check...', v);
    return v;
  }

  login(email: string, password: string, rememberMe = false) {
    return this.http
      .post<R>('/api/auth/passport/signIn', {
        account: email,
        password,
        grantType: 'password',
        remember_me: rememberMe,
      })
      .pipe(
        map((r: R) => this.payload(r)),
        tap((token: Token) => this.token.set(token)),
        map(() => this.check())
      );
  }

  register(signUpForm: SignUpForm) {
    return this.http.post<R>('/api/auth/passport/signUp', signUpForm).pipe(
      map((r: R) => this.payload(r)),
      map(() => this.check())
    );
  }

  payload(r: R) {
    return r.payload.data;
  }

  refresh() {
    const simpleToken: SimpleToken = this.token.get();
    return this.http.post<R>('/api/auth/passport/refresh', simpleToken).pipe(
      map((r: R) => this.payload(r)),
      tap(token => this.token.set(token, true)),
      map(() => this.check())
    );
  }

  logout() {
    return this.http.post('/api/auth/passport/signOut', {}).pipe(
      tap(() => this.token.clear()),
      map(() => !this.check())
    );
  }

  user() {
    return this.user$.pipe(share());
  }
}
