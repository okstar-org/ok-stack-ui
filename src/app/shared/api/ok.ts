export interface ID {
  id: string;
  version?: number;
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

export interface OkApi {
  page: string;
  save: string;
  update: string;
  findById: string;
  deleteById?: string;
}

export interface OkPageApi extends OkApi {
  page: string;
  params: string;
  top: string;
  export: string;
  importBegin?: string;
  importCommit?: string;
}

export interface OkResult<T> {
  code: number;
  msg: string;
  data: T;
  success: boolean;
}

export interface ResList<R> {
  totalCount: number;

  pageCount: number;

  list: R[];
}

export interface OkFormField {
  name: string;
  label: string;
  value: string;
  validations: any;
}
export interface OkFormResult extends ID {
  [k: string]: any;

  controlsConfig: any;
  names: string[];
  fields: OkFormField[];
}

const okPageGroup = new OkPageGroup();

export { okPageGroup };
