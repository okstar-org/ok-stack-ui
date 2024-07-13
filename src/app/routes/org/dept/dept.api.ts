import { OkApi } from '@shared/api/ok';

class Api implements OkApi {
  findById = '/api/org/dept/findById/';
  findByType = '/api/portal/sys/org/dept/findByType/';
  deleteById = '/api/org/dept/deleteById/';
  children = '/api/org/dept/children/';
  getChildren = '/api/org/dept/children';
  getCurrentOrg = '/api/org/current';
  saveOrg = '/api/org/save';

  page = '/api/portal/sys/org/dept/page';
  save = '/api/org/dept';
  update = '/api/portal/sys/org/dept/update';
  sync = '/api/portal/sys/org/dept/sync';
  count = '/api/org/dept/count';

  syncUser = '/api/portal/sys/org/user/sync';
  findUserByDept = '/api/org/post/findByDept/';

  savePost = '/api/org/post/save';
  deletePost = '/api/org/post/deleteById/';
}

const api = new Api();
export { api };

export interface OrgDept {
  id: number;
  parentId: number;
  orgId: number;
  no: string;
  name: string;
  level: number;
  sourceList: string[];
  disabled: boolean;
}

export class DynamicFlatNode {
  constructor(
    public id: number,
    public item: OrgDept,
    public level: number,
    public resourceList: string[],
    public expandable = false,
    public isLoading = false
  ) {}
}

export interface OrgPost {
  id: number;

  /**
   * 编号
   */
  no: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 描述
   */
  descr: string;

  /**
   * 所在部门
   */
  deptId: number | null;

  /**
   * 分配给（是否分配）
   */
  assignFor: string;

  /**
   * 招聘链接
   */
  recruit: string;

  disabled: boolean;

  createAt?: Date;

  createBy?: number;

  updateAt?: Date;

  updateBy?: number;
}
