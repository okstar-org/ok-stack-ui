import { OkApi } from '@shared/api/ok';

export interface OrgIntegrationConf {
  type: string;
  appId: string;
  name: string;
  certKey: string;
  certSecret: string;
  baseUrl: string;
  rootDeptId: string;
}

export interface EyeIconState {
  certKey: boolean;
  certSecret: boolean;
}

class Api implements OkApi {
  save = '';
  page = '';
  update = '/api/org/integration/conf/update';
  findById = '/api/org/integration/conf/list';
  test = '/api/org/integration/conf/test';
  sync = '/api/org/integration/conf/sync';
}

const api = new Api();
export { api };
