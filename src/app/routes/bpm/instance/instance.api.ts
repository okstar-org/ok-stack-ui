import { OkApi } from '@shared/api/ok';

export interface DTO {}

class Api implements OkApi {
  params = '/api/portal/app-bpm/instance/params';
  page = '/api/portal/app-bpm/instance/page';
  top = '/api/portal/app-bpm/instance/page/top';
  export = '/api/portal/app-bpm/instance/export';
  importBegin = '/api/portal/app-bpm/instance/import/begin';
  importAdd = '/api/portal/app-bpm/instance/import/add';
  importCommit = '/api/portal/app-bpm/instance/import/commit';
  save = '/api/portal/app-bpm/instance/save';
  deleteById = '/api/portal/app-bpm/instance/deleteById/';
  findById = '/api/portal/app-bpm/instance/findById/';

  detail: {
    findById: '/api/portal/app-bpm/instance/detail/findById/';
  };
}

const api = new Api();

export { api };
