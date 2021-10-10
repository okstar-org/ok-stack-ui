export interface Header {
  cts: string;
  sts: string;
  traceId: string;
  status: {
    code: number;
    text: string;
  };
}

export interface Payload {
  data: any;
  extra: any;
}

export interface R {
  header: Header;
  payload: Payload;
}

export interface User {
  [propName: string]: any;
  id: number | string | null;
  name?: string;
  email?: string;
  avatar?: string;
}

export interface Token {
  access_token: string;
  refreshToken: string;
  token?: string;
  token_type?: string;
  expires_in?: number;
}

export interface RefreshToken {
  refresh: boolean;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  exp: number;

  refreshTime: () => number;
  valid: () => boolean;
}
