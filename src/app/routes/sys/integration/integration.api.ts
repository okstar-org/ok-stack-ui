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

export interface SysConfIntegrationMinio {
  endpoint: string;
  accessKey: string;
  secretKey: string;
  externalUrl: string;
}

export interface SysConfIntegration {
  im: SysConfIntegrationIm;
  stack: SysConfIntegrationStack;
  keycloak: SysConfIntegrationKeycloak;
  minio: SysConfIntegrationMinio;
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
  minioCredentials: boolean;
}
class Api implements OkApi {
  save = '/api/sys/conf/integration';

  putConf = '/api/sys/conf/integration';
  testConf = '/api/sys/conf/integration/test';

  page = '';
  update = '/api/sys/conf/integration';
  findById = '/api/sys/conf/integration';
}

const api = new Api();
export { api };
