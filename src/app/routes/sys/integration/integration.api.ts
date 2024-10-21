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
  im: SysConfIntegrationIm;
  stack: SysConfIntegrationStack;
  keycloak: SysConfIntegrationKeycloak;
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
  password: boolean;
  clientSecret: boolean;
  apiSecret: boolean;
}
class Api implements OkApi {
  save = '/api/sys/conf/integration';
  putStack = '/api/sys/conf/integration/stack';
  testStack = '/api/sys/conf/integration/stack/test';
  putKeycloak = '/api/sys/conf/integration/keycloak';
  testKeycloak = '/api/sys/conf/integration/keycloak/test';
  putIm = '/api/sys/conf/integration/im';
  testIm = '/api/sys/conf/integration/im/test';
  page = '';
  update = '/api/sys/conf/integration';
  findById = '/api/sys/conf/integration';
}

const api = new Api();
export { api };