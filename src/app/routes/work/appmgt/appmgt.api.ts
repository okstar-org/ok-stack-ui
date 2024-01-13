import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '/api/sys/work/app/detail';
  page = '/api/sys/work/app/page';
  update = '';
  save = '';
  createOrder = '/api/billing/order/create';
  closeOrder = '/api/billing/order/close';
}

const api = new Api();
export { api };

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
  alias: string;
  email: string;
  phone: string;
  clauseUrl: string;
  officialUrl: string;
  privacyPolicyUrl: string;
}

export interface SysWorkAppPermission {
  name: string;
}

export interface SysWorkAppIntroduce {
  content: string;
  pricing: string;
  permissions: string[];
}

export interface SysWorkAppPlan {
  id: number;
  // 套餐名称
  name: string;
  //备注
  descr: string;
  // 价格
  amount: number;
}

export interface SysWorkAppMedia {
  src: string;
  type: string;
}
export interface SysWorkAppDetail {
  name: string;
  author: string;
  avatar: string;
  descr: string;

  provider: SysWorkAppProvider;

  introduce: SysWorkAppIntroduce;

  permissions: SysWorkAppPermission[];

  plans: SysWorkAppPlan[];

  medias: SysWorkAppMedia[];
}

export interface OrderResultEntity {
  no: string;
  url: string;
}
