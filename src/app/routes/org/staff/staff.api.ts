import { OkApi, OkPageApi } from '@shared/api/ok';

class Api implements OkPageApi {
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
  params = '';
  top = '';
  export = '';
  findUserByDept = '/api/org/staff/findByDept';
  listPost = '/api/org/staff/post/list';
  count = '/api/org/staff/count';
  countPost = '/api/org/post/count';
}

const api = new Api();
export { api };

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

  name: string;

  /**
   * 身份证ID
   */
  identity: string;

  gender: Gender;

  iso: string;

  language: string;

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

  birthday: Date;
}

export interface Staff {
  id: number;
  fragment: OrgStaffFragment;
  postIds?: number[];
}

export interface OrgStaff0 {
  id: number;
  no: string;
  name: string;
  phone: string;
  email: string;
  username: string;
  accountId: number;
  gender: string;
  birthday: Date;
  joinedDate: Date;
}

export interface OrgStaffReq {
  id: number;
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
  postIds?: number[];
}

export interface StaffAddOpt extends OrgStaffFragment {
  id: number;
}
