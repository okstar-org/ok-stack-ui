import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  page = '/api/auth/resource/page';
  save = '';
  update = '';
  findById = '';
}

const api = new Api();
export { api };
