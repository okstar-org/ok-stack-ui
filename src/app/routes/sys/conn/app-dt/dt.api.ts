import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '/api/portal/sys/conn/app/findById/';
  findByType = '/api/portal/sys/conn/app/findByType/';
  page = '/api/portal/sys/conn/app/page';
  save = '/api/portal/sys/conn/app/save';
  update = '/api/portal/sys/conn/app/update';
}

const api = new Api();
export { api };
