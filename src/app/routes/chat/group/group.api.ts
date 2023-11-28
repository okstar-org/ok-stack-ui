import { OkApi, OkPageApi } from '@shared/api/ok';

class Api implements OkPageApi {
  save = '';
  page = '/api/chat/group/findAll';
  findById = '';
  update = '';
  params = '';
  top = '';
  export = '';
}

const api = new Api();

export { api };

export interface ChatGroup {
  name: string;
  description: string;
  members: number;
}
