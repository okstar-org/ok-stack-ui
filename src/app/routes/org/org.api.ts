import { OkApi } from '@shared/api/ok';

class Api {
  findById = '';
  page = '';
  getCurrentOrg = '/api/org/current';
}

const api = new Api();
export { api };

export interface Org {
  id: number;
  name: string;
  level: number;
  sourceList: string[];
}
