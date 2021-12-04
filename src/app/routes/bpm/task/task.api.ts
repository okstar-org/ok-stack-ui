 import { OkApi } from '@shared/api/ok';

export interface DTO {}

class Api implements OkApi {
  params = '/api/portal/app-bpm/task/params';
  page = '/api/portal/app-bpm/task/page';
  top = '/api/portal/app-bpm/task/page/top';
  export = '/api/portal/app-bpm/task/export';
  importBegin = '/api/portal/app-bpm/task/import/begin';
  importAdd = '/api/portal/app-bpm/task/import/add';
  importCommit = '/api/portal/app-bpm/task/import/commit';
  save = '/api/portal/app-bpm/task/save';
  deleteById = '/api/portal/app-bpm/task/deleteById/';
  findById = '/api/portal/app-bpm/task/findById/';

  claim = '/api/portal/app-bpm/task/claim';
  release = '/api/portal/app-bpm/task/release';
  suspend = '/api/portal/app-bpm/task/suspend';
  stop = '/api/portal/app-bpm/task/stop';
  resume = '/api/portal/app-bpm/task/resume';
  start = '/api/portal/app-bpm/task/start';
  complete = '/api/portal/app-bpm/task/complete/';

  detail: {
    findById: '/api/portal/app-bpm/task/detail/findById/';
  };
}

const api = new Api();

export { api };
