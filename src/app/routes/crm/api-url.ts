class Lead {
  params = '/api/portal/app-crm/lead/params';
  page = '/api/portal/app-crm/lead/page';
  top = '/api/portal/app-crm/lead/page/top';
  export = '/api/portal/app-crm/lead/export';
  importBegin = '/api/portal/app-crm/lead/import/begin';
  importAdd = '/api/portal/app-crm/lead/import/add';
  importCommit = '/api/portal/app-crm/lead/import/commit';
  form = '/api/portal/app-crm/lead/form';
  save = '/api/portal/app-crm/lead/save';
  deleteById = '/api/portal/app-crm/lead/deleteById/';
  findById = '/api/portal/app-crm/lead/findById/';

  detail = {
    findBySn: '/api/portal/app-crm/lead/detail/findBySn/',
    findById: '/api/portal/app-crm/lead/detail/findById/',
  };
}

class CrmApi {
  constructor() {}

  lead = new Lead();
}

const CRM_API = new CrmApi();
export { CRM_API };

export interface Payload {
  data: any;
  extra: any;
}
