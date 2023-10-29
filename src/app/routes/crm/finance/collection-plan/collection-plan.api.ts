import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  params = '/api/portal/app-crm/collection-plan/params';
  page = '/api/portal/app-crm/collection-plan/page';
  top = '/api/portal/app-crm/collection-plan/page/top';
  export = '/api/portal/app-crm/collection-plan/export';
  importBegin = '/api/portal/app-crm/collection-plan/import/begin';
  importAdd = '/api/portal/app-crm/collection-plan/import/add';
  importCommit = '/api/portal/app-crm/collection-plan/import/commit';
  save = '/api/portal/app-crm/collection-plan/save';
  deleteById = '/api/portal/app-crm/collection-plan/deleteById/';
  findById = '/api/portal/app-crm/collection-plan/findById/';

  detail = {
    findById: '/api/portal/app-crm/collection-plan/detail/findById/',
  };
}

const api = new Api();

export { api };
