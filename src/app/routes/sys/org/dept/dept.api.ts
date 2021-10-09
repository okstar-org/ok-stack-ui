import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '/api/portal/sys/org/dept/findById/';
  findByType = '/api/portal/sys/org/dept/findByType/';
  page = '/api/portal/sys/org/dept/page';
  save = '/api/portal/sys/org/dept/save';
  update = '/api/portal/sys/org/dept/update';

  children = '/api/portal/sys/org/dept/children/';
  sync = '/api/portal/sys/org/dept/sync';
  findByDept = '/api/portal/sys/org/staff/findByDept/';
}

const api = new Api();
export { api };

export interface Dept {
  id: number;
  name: string;
  level: number;
  sourceList: string[];
}

export interface Staff {
  no: number;
  name: string;
  gender: string;
}
