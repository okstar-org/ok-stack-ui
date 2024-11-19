import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  save = '/api/sys/profile/language';
  page = '/api/sys/profile/language/list';
  update = '/api/sys/profile/language';
  findById = '/api/sys/profile/language';
}

const api = new Api();
export { api };

export interface SysLocale {
  //中文(中国)
  label: string;
  //zh-CN
  value: string;
}
