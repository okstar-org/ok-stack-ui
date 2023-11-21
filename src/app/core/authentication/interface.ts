export interface Res {
  takes: number;
  code: number;
  msg: string;
  data: any;
}

export interface MyPostInfo {
  dept: string;
  post: string;
}

export interface MyOrgInfo {
  org: string;
  postInfo: MyPostInfo[];
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
  accessToken: string;
  access_token?: string;
  refreshToken: string;
  refresh_token?: string;
  token?: string;
  tokenType?: string;
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
