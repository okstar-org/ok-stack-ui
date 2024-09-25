import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  page = '/api/auth/resource/page';
  list = '/api/auth/resource/list';
  save = '';
  update = '';
  findById = '';
}

const api = new Api();
export { api };
