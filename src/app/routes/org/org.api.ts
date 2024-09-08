class Api {
  findById = '';
  page = '';
  getCurrentOrg = '/api/org/current';
}

const api = new Api();
export { api };

export interface Org {
  id: number;
  uuid: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 编号
   */
  no: string;
  /**
   * 组织地址
   */
  url: string;
  /**
   * 组织位置
   */
  location: string;
  /**
   * 组织头像（Logo）
   */
  avatar: string;
  /**
   * 认证号
   */
  cert: string;
}
