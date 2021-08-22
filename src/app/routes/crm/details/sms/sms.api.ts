import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '/api/portal/app-crm/lead/detail/sms/findById';
  page = '/api/portal/app-crm/lead/detail/sms/page';
}

const api = new Api();
export { api };
