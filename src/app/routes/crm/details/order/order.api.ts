import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '/api/portal/app-crm/order/findById';
  page = '/api/portal/app-crm/order/page';
}

const api = new Api();
export { api };
