import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '/api/portal/app-crm/lead/detail/call/findById';
  page = '/api/portal/app-crm/lead/detail/call/page';
}

const api = new Api();
export { api };
