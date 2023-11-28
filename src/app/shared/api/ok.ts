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
  save: string;
  update: string;
  deleteById?: string;
  findById: string;
}

export interface OkPageApi extends OkApi {
  page: string;
  params: string;
  top: string;
  export: string;
  importBegin?: string;
  importCommit?: string;
}

export interface OkResult<D> {
  takes: number;
  code: number;
  msg: string;
  data: any;
  success: boolean;
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
