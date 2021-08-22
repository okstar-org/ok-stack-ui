import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '/api/portal/app-crm/lead/detail/attachment/findById';
  page = '/api/portal/app-crm/lead/detail/attachment/page';
}

const api = new Api();
export { api };
