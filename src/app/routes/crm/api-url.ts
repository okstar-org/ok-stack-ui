class Saleslead {
  page = '/api/portal/app-crm/saleslead/page';
  save = '/api/portal/app-crm/saleslead/save';
}

class CrmApi {
  constructor() {}
  saleslead = new Saleslead();
}

const CRM_API = new CrmApi();
export { CRM_API };
