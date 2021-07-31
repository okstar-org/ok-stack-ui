class Saleslead {
  params = '/api/portal/app-crm/saleslead/params';
  page = '/api/portal/app-crm/saleslead/page';
  top = '/api/portal/app-crm/saleslead/page/top';
  export = '/api/portal/app-crm/saleslead/export';
  importBegin = '/api/portal/app-crm/saleslead/import/begin';
  importAdd = '/api/portal/app-crm/saleslead/import/add';
  importCommit = '/api/portal/app-crm/saleslead/import/commit';
  save = '/api/portal/app-crm/saleslead/save';
  deleteById = '/api/portal/app-crm/saleslead/deleteById/';
  findById = '/api/portal/app-crm/saleslead/findById/';

  detail = {
    findById: '/api/portal/app-crm/saleslead/detail/findById/',
  };
}

class CrmApi {
  constructor() {}

  saleslead = new Saleslead();
}

const CRM_API = new CrmApi();
export { CRM_API };

export interface Payload {
  data: any;
  extra: any;
}
