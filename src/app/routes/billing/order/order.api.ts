import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  page = '/api/billing/order/page';
  findById = '/api/billing/order/detail';
  update = '';
  save = '';
}

const api = new Api();
export { api };
