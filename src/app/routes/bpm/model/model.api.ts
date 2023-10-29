import { OkApi } from '@shared/api/ok';

export interface DTO {}

class Api implements OkApi {
  findById = '/api/portal/app-bpm/engine/getConfig';
  page: string = '';
  findByType?: string;
}

const api = new Api();

export { api };
