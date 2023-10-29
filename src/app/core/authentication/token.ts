import { capitalize, now, timeLeft } from '@core/authentication/helpers';
import { RefreshToken, Token } from '@core/authentication/interface';

export class SimpleToken implements RefreshToken {
  refresh = false;
  accessToken = '';
  refreshToken = '';
  tokenType = '';
  exp = 0;

  constructor(attributes: any) {
    Object.assign(this, attributes || {});
  }

  public static create(token: Token) {
    const accessToken = token.access_token || token.token || '';
    const tokenType = token.token_type || 'bearer';
    const refreshToken = token.refresh_token;
    const expiresIn = token.expires_in || 0;
    const exp = expiresIn <= 0 ? 0 : now() + expiresIn * 1000;

    return new SimpleToken({ accessToken, refreshToken, tokenType, exp });
  }

  valid() {
    return !!this.accessToken && !this.isExpired();
  }

  isExpired() {
    return this.exp !== 0 && this.exp - now() < 0;
  }

  headerValue() {
    return this.accessToken ? [capitalize(this.tokenType), this.accessToken].join(' ') : '';
  }

  refreshTime() {
    return timeLeft(this.exp - 15000);
  }

  clone(attributes: any = {}) {
    return new SimpleToken(Object.assign({}, this, attributes));
  }
}
