import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '';
  page = '/api/org/staff/pending/page';
  join = '/api/org/staff/pending/join';
}

const api = new Api();
export { api };
