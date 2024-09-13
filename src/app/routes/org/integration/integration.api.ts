import { OkApi } from '@shared/api/ok';

export interface SysConfIntegrationIm {
  host: string;
  adminPort: number;
  apiSecret: string;
}

export interface SysConfIntegrationStack {
  fqdn: string;
}

export interface SysConfIntegrationKeycloak {
  serverUrl: string;
  realm: string;
  clientId: string;
  username: string;
  password: string;
  clientSecret: string;
}

export interface SysConfIntegration {
  type: string;
  appId: string;
  name: string;
  certKey: string;
  certSecret: string;
  baseUrl: string;
  rootDeptId: string;
}

export interface SysSetPersonal {
  accountId: number;
  //zh-CN
  language: string;
}

export interface SysSetLocale {
  //中文(中国)
  label: string;
  //zh-CN
  value: string;
}

export interface EyeIconState {
  certKey: boolean;
  certSecret: boolean;
}
class Api implements OkApi {
  save = '';
  page = '';
  update = '/api/sys/conf/integration';
  findById = '/api/org/integration/conf/list';
  test = '/api/org/integration/conf/test';
}

const api = new Api();
export { api };
