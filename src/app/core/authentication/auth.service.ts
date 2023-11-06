import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Res, Token, User, SignUpForm } from './interface';
import { guest } from './user';
import { SimpleToken } from './token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User>(guest);

  private userReq$ = this.http.get<Res>('/api/portal/sys/me');

  constructor(
    private logger: NGXLogger,
    private http: HttpClient,
    private token: TokenService
  ) {
    this.token
      .change()
      .pipe(
        switchMap(() =>
          this.check() ? this.userReq$.pipe(map((r: Res) => this.payload(r))) : of(guest)
        )
      )
      .subscribe(user => this.user$.next(Object.assign({}, guest, user)));

    this.token
      .refresh()
      .pipe(switchMap(() => this.refresh()))
      .subscribe();
  }

  check() {
    console.debug('check...');
    const v = this.token.valid();
    console.debug('check=>', v);
    return v;
  }

  payload(r: Res) {
    console.log('res', r);
    return r.data;
  }

  login(email: string, password: string, rememberMe = false) {
    return this.http
      .post<Res>('/api/auth/passport/signIn', {
        account: email,
        password,
        grantType: 'password',
        rememberMe,
      })
      .pipe(
        map((r: Res) => {
          console.log('res', r);
          return this.payload(r);
        }),
        tap((token: Token) => {
          console.log('token', token);
          this.token.set(token);
        }),
        map(() => {
          console.log('check');
          this.check();
        })
      );
  }

  register(signUpForm: SignUpForm) {
    return this.http
      .post<Res>('/api/auth/passport/signUp', signUpForm)
      .pipe(map((r: Res) => this.payload(r)));
  }

  refresh() {
    const simpleToken: SimpleToken = this.token.get();
    return this.http.post<Res>('/api/auth/passport/refresh', simpleToken).pipe(
      map((r: Res) => this.payload(r)),
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
