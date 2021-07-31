import { OkApi } from './../../../shared/api/ok';

class CustomerApi implements OkApi {
  params = '/api/portal/app-crm/customer/params';
  page = '/api/portal/app-crm/customer/page';
  top = '/api/portal/app-crm/customer/page/top';
  export = '/api/portal/app-crm/customer/export';
  importBegin = '/api/portal/app-crm/customer/import/begin';
  importAdd = '/api/portal/app-crm/customer/import/add';
  importCommit = '/api/portal/app-crm/customer/import/commit';
  save = '/api/portal/app-crm/customer/save';
  deleteById = '/api/portal/app-crm/customer/deleteById/';
  findById = '/api/portal/app-crm/customer/findById/';

  detail: {
    findById: '/api/portal/app-crm/customer/detail/findById/';
  };
}

const customerApi = new CustomerApi();

export { customerApi };
