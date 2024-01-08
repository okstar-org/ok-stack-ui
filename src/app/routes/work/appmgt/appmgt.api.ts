import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '/api/sys/work/app/detail';
  page = '/api/sys/work/app/page';
  update = '';
  save = '';
}

const api = new Api();
export { api };

export interface ResList<R> {
  totalCount: number;

  pageCount: number;

  list: R[];
}

export interface SysWorkAppDTO {
  /**
   * Key
   */
  key: string;

  /**
   * 应用名称
   */
  name: string;

  /**
   * 图标
   */
  avatar: string;

  /**
   * 备注
   */
  descr: string;

  /**
   * 开发者
   */
  author: string;

  /**
   * 邮件
   */
  mail: string;

  /**
   * 主页
   */
  homePage: string;
}
export interface SysWorkAppProvider {
  avatar: string;
  name: string;
  email: string;
  phone: string;
  clause_url: string;
  official_url: string;
  privacy_policy_url: string;
}

export interface SysWorkAppTag {
  desc: string;
  group_id: string;
  group_name: string;
  id: number;
}
export interface SysWorkAppMedia {
  type: string; //image,video,audio
  src: string;
}
export interface SysWorkAppRemark {
  content: string;
  images: SysWorkAppMedia[];
}

export interface SysWorkAppDetail {
  name: string;
  author: string;
  avatar: string;
  descr: string;

  provider: SysWorkAppProvider;

  remark: SysWorkAppRemark;

  tags: SysWorkAppTag[];
}
