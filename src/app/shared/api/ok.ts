export interface ID {
  id: string;
}

export interface OkGroup {}

export interface OkPageParams {
  page: number;
  size: number;
  sort?: string;
  keyword?: string;
}

class OkPageGroup implements OkGroup, OkPageParams {
  page = 0;
  size = 10;
  sort = 'ordinal,desc';
  keyword?: string;
}

export interface OkApi {}

export interface OkPageApi extends OkApi {
  params: string;
  page: string;
  top: string;
  export: string;
  importBegin: string;
  importCommit: string;
  save: string;
  deleteById: string;
  findById: string;
}

export interface OkPayload {
  data: any;
  extra: any;
}

export interface OkResult {
  header: { cts: Date; sts: Date };
  payload: OkPayload;
  success: boolean;
}

const okPageGroup = new OkPageGroup();

export { okPageGroup };
