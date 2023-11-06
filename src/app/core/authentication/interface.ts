export interface Res {
  takes: number;
  code: number;
  msg: string;
  data: any;
}

export interface User {
  [propName: string]: any;
  id: number | string | null;
  name?: string;
  email?: string;
  avatar?: string;
}

export interface SignUpForm {
  //帐号类型
  accountType: string;

  //国家代号
  iso: string;

  //帐号(手机号或者邮箱)
  account: string;

  //密码
  password: string;

  firstName?: string;

  lastName?: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
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
