import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '/api/portal/sys/org/dept/findById/';
  findByType = '/api/portal/sys/org/dept/findByType/';
  deleteById = '/api/portal/sys/org/dept/deleteById/';
  children = '/api/portal/sys/org/dept/children/';
  getChildren = '/api/org/staff/children';
  page = '/api/portal/sys/org/dept/page';
  save = '/api/portal/sys/org/dept/save';
  update = '/api/portal/sys/org/dept/update';
  sync = '/api/portal/sys/org/dept/sync';

  findUserByDept = '/api/org/staff/findByDept/';
  syncUser = '/api/portal/sys/org/user/sync';
}

const api = new Api();
export { api };

export interface Staff {
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
