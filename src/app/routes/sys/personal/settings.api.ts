import { OkApi } from '@shared/api/ok';

export interface WebsiteInfo {
  title: string;
  license: string;
  copyright: string;
}

class Api implements OkApi {
  save = '/api/sys/conf/settings/website';
  page = '/api/sys/conf/settings/website';
  update = '/api/sys/conf/settings/website';
  findById = '';
}

const api = new Api();
export { api };
