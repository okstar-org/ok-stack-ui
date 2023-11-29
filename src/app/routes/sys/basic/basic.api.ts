import { OkApi } from '@shared/api/ok';

export interface SysBasic {
  globalEnable: boolean;
  verifyAccount: boolean;
  //语言-地区/国家
  locale: string;
}

class Api implements OkApi {
  save = '';
  update = '/api/sys/settings/basic/update';
  findById = '/api/sys/settings/basic/find';
  findLocales = '/api/sys/settings/basic/findLocales';
}

const api = new Api();
export { api };
