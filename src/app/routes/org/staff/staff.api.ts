import { RequiredValidator, Validators } from '@angular/forms';
import { OkApi, OkPageApi } from '@shared/api/ok';

class Api implements OkPageApi {
  findById = '/api/org/staff/findById/';
  findByType = '/api/org/staff/findByType/';
  deleteById = '/api/org/staff/deleteById/';
  children = '/api/org/staff/children/';
  getChildren = '/api/org/staff/children';
  page = '/api/org/staff/page';
  save = '/api/org/staff';
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

export interface OrgStaffProfile {
  accountId: number;

  /**
   * 性
   */
  firstName: string;

  /**
   * 名
   */
  lastName: string;

  /**
   * 身份证ID
   */
  identify: string;

  gender: Gender;

  language: string;

  /**
   * 电话
   */
  telephone: string;

  //手机
  phone: string;
  /**
   * email
   */
  email: string;

  /**
   * 备注
   */
  description: string;

  birthday: Date;

  country: string;

  city: string;

  province: string;

  address: string;

  website: string;
}

export interface OrgStaffEdit extends OrgStaffProfile {
  id: number;
}

export interface Staff {
  id: number;
  /**
   * 编号
   */
  no: string;
  fragment: OrgStaffProfile;
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
  fragment: OrgStaffProfile;
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

export interface StaffAddOpt extends OrgStaffProfile {
  id: number;
}

const staffForm = {
  telephone: [''],
  phone: [''],
  email: ['', [Validators.email, Validators.required]],
  gender: [Gender.NONE, Validators.required],
  birthday: [new Date()],
  lastName: ['', Validators.required],
  firstName: ['', Validators.required],
  identify: [''],
  description: [''],
  country: [''],
  province: [''],
  city: [''],
  address: [''],
  language: [''],
  accountId: [0],
  website: [''],
};

export { staffForm };
