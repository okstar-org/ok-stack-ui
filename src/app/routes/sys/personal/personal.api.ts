import { OkApi } from '@shared/api/ok';

export interface SysSetPersonal {
  accountId: number;
  //zh-CN
  language: string;
}

export interface SysSetLocale {
  //中文(中国)
  label: string;
  //zh-CN
  value: string;
}

class Api implements OkApi {
  save = '';
  page = '';
  update = '/api/sys/settings/basic/global';
  findById = '/api/sys/settings/basic/global';
  languages = '/api/sys/conf/personal/languages';
  personal = '/api/sys/conf/personal';
}

const api = new Api();
export { api };
