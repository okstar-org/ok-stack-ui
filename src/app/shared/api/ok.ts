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

export interface OkApi {
  findById: string;
  page: string;
  findByType?: string;
}

export interface OkPageApi extends OkApi {
  params: string;
  top: string;
  export: string;
  importBegin: string;
  importCommit: string;
  save: string;
  deleteById: string;
}

export interface OkPayload<D> {
  data: D;
  extra: any;
}

export interface OkResult<D> {
  header: { cts: Date; sts: Date };
  status: { code: number; name: string; text: string };
  payload: OkPayload<D>;
  success: boolean;
}

export interface OkFormControl {
  name: string;
  label: string;
  value: string;
}
export interface OkFormResult{
  controlsConfig: any;
  fields: OkFormControl[];
}

const okPageGroup = new OkPageGroup();

export { okPageGroup };
