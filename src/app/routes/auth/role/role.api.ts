import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  page = '/api/auth/role/page';
  list = '/api/auth/role/list';
  save = '';
  update = '';
  findById = '';
}

const api = new Api();
export { api };
