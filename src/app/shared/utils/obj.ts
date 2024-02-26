export interface OkEntity {
  id: number;
  /**
   * 创建者
   */
  createBy?: number;

  /**
   * 创建时间
   */
  createAt?: Date;

  /**
   * 更新者
   */
  updateBy?: number;

  /**
   * 更新时间
   */
  updateAt?: Date;
}

export function deleteEntityTimes(r: OkEntity) {
  if (!r) return r;
  delete r.createAt;
  delete r.updateAt;
  delete r.createBy;
  delete r.updateBy;
  return r;
}
