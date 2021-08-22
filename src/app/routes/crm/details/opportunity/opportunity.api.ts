import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '/api/portal/app-crm/opportunity/findById';
  page = '/api/portal/app-crm/opportunity/page';
}

const api = new Api();
export { api };
