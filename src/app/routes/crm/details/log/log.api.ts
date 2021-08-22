import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '/api/portal/app-crm/lead/detail/log/findById';
  page = '/api/portal/app-crm/lead/detail/log/page';
}

const api = new Api();
export { api };
