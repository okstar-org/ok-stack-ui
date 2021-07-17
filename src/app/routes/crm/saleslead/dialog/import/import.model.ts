export enum Status {
  READY = '就绪',
  UPLOADING = '上传中',
  FINISHED = '上传完成',
  SUBMITING = '提交中',
  COMPLETED = '提交完成',
  CANCELED = '取消',
}

export class DTO {
  _isUploaded: boolean;
}
