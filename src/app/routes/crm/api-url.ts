class Saleslead {
  page = '/api/portal/app-crm/saleslead/page';
  save = '/api/portal/app-crm/saleslead/save';
  top = '/api/portal/app-crm/saleslead/top';
  deleteById = '/api/portal/app-crm/saleslead/deleteById/';
}

class CrmApi {
  constructor() {}
  saleslead = new Saleslead();
}

const CRM_API = new CrmApi();
export { CRM_API };
