import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  page = '/api/org/staff/left/page';
  findById = '';
  save = '';
  update = '';
}

const api = new Api();
export { api };
