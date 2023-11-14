import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '';
  page = '/api/org/staff/employed/page';
  leave = '/api/org/staff/employed/leave';
}

const api = new Api();
export { api };
