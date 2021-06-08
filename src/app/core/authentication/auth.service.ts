import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Token, User } from './interface';
import { guest } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User>(guest);

  private userReq$ = this.http.get<User>('/api/portal/admin/me');

  constructor(private http: HttpClient, private token: TokenService) {
    this.token
      .change()
      .pipe(switchMap(() => (this.check() ? this.userReq$ : of(guest))))
      .subscribe(user => this.user$.next(Object.assign({}, guest, user)));

    this.token
      .refresh()
      .pipe(switchMap(() => this.refresh()))
      .subscribe();
  }

  check() {
    return this.token.valid();
  }

  login(email: string, password: string, rememberMe = false) {
    return this.http
      .post<Token>('/api/portal/admin/passport/login', { email, password, remember_me: rememberMe })
      .pipe(
        map((r: any) => r.payload.data),
        tap(token => this.token.set(token)),
        map(() => this.check())
      );
  }

  refresh() {
    return this.http.post<Token>('/api/portal/admin/passport/refresh', {}).pipe(
      tap(token => this.token.set(token, true)),
      map(() => this.check())
    );
  }

  logout() {
    return this.http.post('/api/portal/admin/passport/logout', {}).pipe(
      tap(() => this.token.clear()),
      map(() => !this.check())
    );
  }

  user() {
    return this.user$.pipe(share());
  }
}
