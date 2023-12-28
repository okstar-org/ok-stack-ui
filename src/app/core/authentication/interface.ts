export interface Res {
  takes: number;
  code: number;
  msg: string;
  data: any;
}

export interface PostInfo {
  dept: string;
  post: string;
}

export interface Org {
  name: string;
  url: string;
  avatar: string;
  location: string;
}

export interface Staff {
  no: string;
  phone: string;
  email: string;
}

export interface MyOrgInfo {
  staff: Staff;
  org: Org;
  postInfo: PostInfo[];
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
  refresh: boolean;
  tokenType: string;

  accessToken: string;

  expiresIn: number;
  refreshToken: string;

  refreshExpiresIn: number;
}

export interface RefreshToken extends Token {
  refreshExpiresIn: number;
  refreshTime: () => number;
  valid: () => boolean;
}
