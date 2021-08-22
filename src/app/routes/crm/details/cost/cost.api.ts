import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '/api/portal/app-crm/cost/findById';
  page = '/api/portal/app-crm/cost/page';
}

const api = new Api();
export { api };
