import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '/api/org/staff/findById/';
  findByType = '/api/org/staff/findByType/';
  deleteById = '/api/org/staff/deleteById/';
  children = '/api/org/staff/children/';
  getChildren = '/api/org/staff/children';
  page = '/api/org/staff/page';
  save = '/api/org/staff/save';
  update = '/api/org/staff/update';
  sync = '/api/org/staff/sync';
  syncUser = '/api/portal/sys/org/user/sync';

  findUserByDept = '/api/org/staff/findByDept/';
  listPost = '/api/org/staff/post/list';
}

const api = new Api();
export { api };

export interface Staff {
  id: number;
  no: number;
  name: string;
  gender: string;
  mobile: string;
  active: string;
  avatar: string;
  postIds: number[];

  // sourceList: string[];
}
export enum Gender {
  NONE,
  MALE,
  FEMALE,
}
export interface OrgStaffFragment {
  /**
   * 编号
   */
  no: string;

  /**
   * 性
   */
  firstName: string;

  /**
   * 名
   */
  lastName: string;

  /**
   * 性别
   */
  // gender: Gender;

  /**
   * 身份证ID
   */
  identity: string;

  /**
   * 电话
   */
  phone: string;

  /**
   * email
   */
  email: string;

  /**
   * 备注
   */
  descr: string;

  /**
   * 居住地址
   */
  livingIn: string;
}

export interface OrgStaffReq {
  fragment: OrgStaffFragment;
}

/**员工入职请求 */
export interface OrgStaffJoinReq {
  staffId: number;
  postIds: number[];
}

export interface StaffJoinOpt {
  id: number;
  reassignment: boolean;
  postIds: number[];
}
