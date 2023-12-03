import { OkApi } from '@shared/api/ok';

export interface SysSetGlobal {
  globalEnable: boolean;
  verifyAccount: boolean;
}

export interface SysSetPersonal {
  accountId: number;
  //zh-CN
  locale: string;
}

export interface SysSetLocale {
  //中文(中国)
  label: string;
  //zh-CN
  value: string;
}

class Api implements OkApi {
  save = '';
  update = '/api/sys/settings/basic/global';
  findById = '/api/sys/settings/basic/global';
  findLocales = '/api/sys/settings/basic/findLocales';

  personal = '/api/sys/settings/basic/personal';
}

const api = new Api();
export { api };
