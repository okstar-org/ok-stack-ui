import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  params = '/api/portal/app-crm/invoice/params';
  page = '/api/portal/app-crm/invoice/page';
  top = '/api/portal/app-crm/invoice/page/top';
  export = '/api/portal/app-crm/invoice/export';
  importBegin = '/api/portal/app-crm/invoice/import/begin';
  importAdd = '/api/portal/app-crm/invoice/import/add';
  importCommit = '/api/portal/app-crm/invoice/import/commit';
  save = '/api/portal/app-crm/invoice/save';
  deleteById = '/api/portal/app-crm/invoice/deleteById/';
  findById = '/api/portal/app-crm/invoice/findById/';
}

const api = new Api();
export { api };
