import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '/api/org/staff/findById/';
  findByType = '/api/org/staff/findByType/';
  deleteById = '/api/org/staff/deleteById/';
  children = '/api/org/staff/children/';
  getChildren = '/api/org/staff/children';
  page = '/api/org/staff/page';
  save = '/api/org/staff/save';
  update = '/api/org/staff/update';
  sync = '/api/org/staff/sync';

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
