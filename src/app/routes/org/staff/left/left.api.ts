import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '';
  page = '/api/org/staff/left/page';
}

const api = new Api();
export { api };
