import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '/api/portal/app-crm/invoice/findById';
  page = '/api/portal/app-crm/invoice/page';
}

const api = new Api();
export { api };
