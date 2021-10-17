import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '/api/portal/sys/org/dept/findById/';
  findByType = '/api/portal/sys/org/dept/findByType/';
  deleteById = '/api/portal/sys/org/dept/deleteById/';
  children = '/api/portal/sys/org/dept/children/';
  page = '/api/portal/sys/org/dept/page';
  save = '/api/portal/sys/org/dept/save';
  update = '/api/portal/sys/org/dept/update';
  sync = '/api/portal/sys/org/dept/sync';

  syncUser = '/api/portal/sys/org/user/sync';
  findUserByDept = '/api/portal/sys/org/user/findByDept/';
}

const api = new Api();
export { api };

export interface Dept {
  id: number;
  name: string;
  level: number;
  sourceList: string[];
}

export interface User {
  no: number;
  name: string;
  gender: string;
  mobile: string;
  active: string;
  avatar: string;
}
