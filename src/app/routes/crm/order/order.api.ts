import { OkApi } from '../../../shared/api/ok';

class OrderApi implements OkApi {
  params = '/api/portal/app-crm/order/params';
  page = '/api/portal/app-crm/order/page';
  top = '/api/portal/app-crm/order/page/top';
  export = '/api/portal/app-crm/order/export';
  importBegin = '/api/portal/app-crm/order/import/begin';
  importAdd = '/api/portal/app-crm/order/import/add';
  importCommit = '/api/portal/app-crm/order/import/commit';
  save = '/api/portal/app-crm/order/save';
  deleteById = '/api/portal/app-crm/order/deleteById/';
  findById = '/api/portal/app-crm/order/findById/';

  detail = {
    findById: '/api/portal/app-crm/order/detail/findById/',
  };
}

const orderApi = new OrderApi();

export { orderApi };
